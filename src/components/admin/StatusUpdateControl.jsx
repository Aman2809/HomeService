import { useState, useEffect } from 'react'
import { getAllowedNextStatuses } from '../../utils/adminStatusTransitions.js'
import { BOOKING_STATUS_LABELS } from '../../constants/bookingStatus.js'
import { updateRequestStatus } from '../../lib/api/adminRequests.js'

function label(status) {
  return BOOKING_STATUS_LABELS[status?.toUpperCase()] ?? status
}

export default function StatusUpdateControl({ requestId, currentStatus, onUpdated }) {
  const allowedNext = getAllowedNextStatuses(currentStatus)
  const [selected, setSelected] = useState(allowedNext[0] ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Re-sync the selected option whenever the request's actual status
  // changes (e.g. right after a successful update) — without this,
  // `selected` keeps its pre-update value even though the set of
  // valid options for the NEW status has changed, leaving the <select>
  // out of sync with its own options.
  useEffect(() => {
    setSelected(getAllowedNextStatuses(currentStatus)[0] ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatus])

  if (allowedNext.length === 0) {
    return (
      <p className="text-sm text-navy-700">
        No further status changes are available for a {label(currentStatus)} request.
      </p>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting || !selected) return
    setSubmitting(true)
    setError(null)

    const { data, error: updateError } = await updateRequestStatus(requestId, selected)

    if (updateError) {
      setError('We couldn\u2019t update the status. Please try again.')
      setSubmitting(false)
      return
    }

    setSubmitting(false)
    onUpdated(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="nextStatus" className="block text-xs font-medium text-navy-700">
          Update status to
        </label>
        <select
          id="nextStatus"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="mt-1 w-full rounded-xl border border-navy-950/15 px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
        >
          {allowedNext.map((status) => (
            <option key={status} value={status}>{label(status)}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-950 transition-colors enabled:hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Updating…' : 'Update Status'}
      </button>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-600 sm:basis-full">
          {error}
        </p>
      )}
    </form>
  )
}