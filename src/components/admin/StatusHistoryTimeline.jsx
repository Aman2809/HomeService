import { BOOKING_STATUS_LABELS } from '../../constants/bookingStatus.js'

function label(status) {
  return BOOKING_STATUS_LABELS[status?.toUpperCase()] ?? status
}

export default function StatusHistoryTimeline({ history }) {
  const sorted = [...(history ?? [])].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  )

  if (sorted.length === 0) {
    return <p className="text-sm text-navy-700">No status history yet.</p>
  }

  return (
    <ol className="space-y-3">
      {sorted.map((entry) => (
        <li key={entry.id} className="flex gap-3 text-sm">
          <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gold-500" />
          <div>
            <p className="font-medium text-navy-950">
              {entry.old_status ? `${label(entry.old_status)} → ${label(entry.new_status)}` : `Created as ${label(entry.new_status)}`}
            </p>
            <p className="text-xs text-navy-700/70">
              {new Date(entry.created_at).toLocaleString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
              })}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}