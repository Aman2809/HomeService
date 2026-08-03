import { useEffect, useState, useCallback } from 'react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import RequestFilters from '../../components/admin/RequestFilters.jsx'
import RequestRow from '../../components/admin/RequestRow.jsx'
import { getRequests } from '../../lib/api/adminRequests.js'

const DEFAULT_FILTERS = { search: '', status: '', areaId: '', dateFrom: '', dateTo: '' }

export default function AdminRequests() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [appliedSearch, setAppliedSearch] = useState('')
  const [page, setPage] = useState(1)

  const [requests, setRequests] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadRequests = useCallback(() => {
    setLoading(true)
    setError(null)

    getRequests({
      page,
      status: filters.status || undefined,
      areaId: filters.areaId || undefined,
      dateFrom: filters.dateFrom || undefined,
      dateTo: filters.dateTo || undefined,
      search: appliedSearch || undefined,
    }).then((result) => {
      if (result.error) {
        setError('We couldn\u2019t load requests. Please try again.')
        setRequests([])
        setTotalPages(0)
        setCount(0)
      } else {
        setRequests(result.data ?? [])
        setTotalPages(result.totalPages)
        setCount(result.count)
      }
      setLoading(false)
    })
  }, [page, filters.status, filters.areaId, filters.dateFrom, filters.dateTo, appliedSearch])

  useEffect(() => {
    loadRequests()
  }, [loadRequests])

  function handleFilterChange(partial) {
    setPage(1)
    setFilters((prev) => ({ ...prev, ...partial }))
  }

  function handleSearchSubmit() {
    setPage(1)
    setAppliedSearch(filters.search)
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-950">All Requests</h1>
        {!loading && !error && (
          <p className="text-sm text-navy-700">{count} total</p>
        )}
      </div>

      <div className="mt-6">
        <RequestFilters
          filters={filters}
          onChange={handleFilterChange}
          onSearchSubmit={handleSearchSubmit}
        />
      </div>

      <div className="mt-6">
        {loading && <p className="text-sm text-navy-700">Loading requests…</p>}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p role="alert" className="text-sm font-medium text-red-600">{error}</p>
            <button
              type="button"
              onClick={loadRequests}
              className="mt-3 rounded-full border border-red-300 px-4 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="rounded-2xl border border-navy-950/10 bg-white p-8 text-center">
            <p className="text-sm text-navy-700">No requests match these filters.</p>
          </div>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="space-y-3">
            {requests.map((request) => (
              <RequestRow key={request.id} request={request} />
            ))}
          </div>
        )}
      </div>

      {!loading && !error && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-full border border-navy-950/15 px-5 py-2 text-sm font-medium text-navy-900 enabled:hover:bg-navy-950/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <p className="text-sm text-navy-700">
            Page {page} of {totalPages}
          </p>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-full border border-navy-950/15 px-5 py-2 text-sm font-medium text-navy-900 enabled:hover:bg-navy-950/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </AdminLayout>
  )
}