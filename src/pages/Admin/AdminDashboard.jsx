import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import StatusSummaryCard from '../../components/admin/StatusSummaryCard.jsx'
import BookingCard from '../../components/account/BookingCard.jsx'
import { getDashboardCounts, getRecentRequests } from '../../lib/api/adminRequests.js'

/**
 * Summary cards shown, per requirement #22: New Requests (pending),
 * In Progress, Completed — plus Confirmed, since the dashboard should
 * reflect the real status vocabulary already in the database rather
 * than inventing a narrower "New/Pending" merge. Cancelled is
 * available in the full requests list (Phase 3) but omitted from the
 * headline cards, consistent with dashboards emphasizing active work.
 */
const SUMMARY_CARDS = [
  { status: 'pending', label: 'New / Pending', accentClass: 'text-amber-600' },
  { status: 'confirmed', label: 'Confirmed', accentClass: 'text-blue-600' },
  { status: 'in_progress', label: 'In Progress', accentClass: 'text-purple-600' },
  { status: 'completed', label: 'Completed', accentClass: 'text-emerald-600' },
]

export default function AdminDashboard() {
  const [counts, setCounts] = useState(null)
  const [recentRequests, setRecentRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    Promise.all([getDashboardCounts(), getRecentRequests(8)]).then(
      ([countsResult, recentResult]) => {
        if (!isMounted) return

        if (countsResult.error || recentResult.error) {
          setError('We couldn\u2019t load the dashboard. Please refresh the page.')
        } else {
          setCounts(countsResult.data)
          setRecentRequests(recentResult.data ?? [])
        }
        setLoading(false)
      },
    )

    return () => { isMounted = false }
  }, [])

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-navy-950">Dashboard</h1>

      {loading && <p className="mt-6 text-sm text-navy-700">Loading dashboard…</p>}

      {error && (
        <p role="alert" className="mt-6 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SUMMARY_CARDS.map((card) => (
              <StatusSummaryCard
                key={card.status}
                label={card.label}
                count={counts?.[card.status] ?? 0}
                accentClass={card.accentClass}
              />
            ))}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy-950">Recent Requests</h2>
              <Link
                to="/admin/requests"
                className="text-sm font-medium text-navy-700 hover:text-navy-950"
              >
                View All
              </Link>
            </div>

            {recentRequests.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-navy-950/10 bg-white p-8 text-center">
                <p className="text-sm text-navy-700">No service requests yet.</p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {recentRequests.map((request) => (
                  <BookingCard key={request.id} booking={request} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  )
}