import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Phone, MessageCircle, ArrowLeft } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import AdminStatusBadge from '../../components/admin/AdminStatusBadge.jsx'
import StatusHistoryTimeline from '../../components/admin/StatusHistoryTimeline.jsx'
import StatusUpdateControl from '../../components/admin/StatusUpdateControl.jsx'
import BookingCard from '../../components/account/BookingCard.jsx'
import { getRequestById } from '../../lib/api/adminRequests.js'
import { businessConfig } from '../../constants/businessConfig.js'
import { buildWhatsAppLink } from '../../utils/whatsapp.js'

export default function AdminRequestDetail() {
  const { id } = useParams()
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)       // initial load only
  const [refreshing, setRefreshing] = useState(false) // background refresh after a status update
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const loadRequest = useCallback((isBackgroundRefresh = false) => {
    if (isBackgroundRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    setError(null)
    setNotFound(false)

    getRequestById(id).then(({ data, error: fetchError }) => {
      if (fetchError) {
        // PostgREST returns PGRST116 when .single() finds no row —
        // distinguish "not found" from a genuine fetch/network error.
        if (fetchError.code === 'PGRST116') {
          setNotFound(true)
        } else {
          setError('We couldn\u2019t load this request. Please try again.')
        }
      } else {
        setRequest(data)
      }
      setLoading(false)
      setRefreshing(false)
    })
  }, [id])

  useEffect(() => {
    loadRequest(false)
  }, [loadRequest])

  // Badge updates immediately from the RPC's own return value (status
  // only). The full row — including refreshed items and status
  // history — is fetched in the background via isBackgroundRefresh,
  // so the already-rendered content never disappears mid-update.
  function handleStatusUpdated(updatedRow) {
    setRequest((prev) => (prev ? { ...prev, status: updatedRow.status } : prev))
    setStatusMessage('Status updated.')
    loadRequest(true)
  }

  return (
    <AdminLayout>
      <Link
        to="/admin/requests"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:text-navy-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to All Requests
      </Link>

      {loading && <p className="mt-6 text-sm text-navy-700">Loading request…</p>}

      {notFound && (
        <div className="mt-6 rounded-2xl border border-navy-950/10 bg-white p-8 text-center">
          <p className="text-sm text-navy-700">This service request could not be found.</p>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <p role="alert" className="text-sm font-medium text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => loadRequest(false)}
            className="mt-3 rounded-full border border-red-300 px-4 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && !notFound && request && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-navy-950">{request.public_reference}</h1>
            <AdminStatusBadge status={request.status} />
          </div>

          <section className="rounded-2xl border border-navy-950/10 bg-white p-5">
            <h2 className="text-sm font-semibold text-navy-950">Customer</h2>
            <div className="mt-3 space-y-1 text-sm text-navy-700">
              <p><span className="font-medium text-navy-950">Name:</span> {request.customer_name}</p>
              <p><span className="font-medium text-navy-950">Phone:</span> {request.phone}</p>
              {request.email && (
                <p><span className="font-medium text-navy-950">Email:</span> {request.email}</p>
              )}
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href={`tel:${request.phone}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy-950/15 py-2.5 text-sm font-medium text-navy-900 sm:flex-initial sm:px-6"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <a
                href={buildWhatsAppLink(
                  businessConfig.whatsapp,
                  `Hello ${request.customer_name}, this is regarding your service request ${request.public_reference}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-2.5 text-sm font-medium text-white sm:flex-initial sm:px-6"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-navy-950/10 bg-white p-5">
            <h2 className="text-sm font-semibold text-navy-950">Update Status</h2>
            {statusMessage && (
              <p className="mt-2 text-sm font-medium text-emerald-600">{statusMessage}</p>
            )}
            <div className="mt-3">
              <StatusUpdateControl
                requestId={request.id}
                currentStatus={request.status}
                onUpdated={handleStatusUpdated}
              />
            </div>
          </section>

          <BookingCard booking={request} />

          <section className="rounded-2xl border border-navy-950/10 bg-white p-5">
            <h2 className="text-sm font-semibold text-navy-950">Status History</h2>
            <div className="mt-3">
              <StatusHistoryTimeline history={request.service_request_status_history} />
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  )
}