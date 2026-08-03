import { BOOKING_STATUS_LABELS, BOOKING_STATUS_STYLES } from '../../constants/bookingStatus.js'

/**
 * Same normalization as BookingCard's internal StatusBadge (DB values
 * are lowercase, BOOKING_STATUS_LABELS/STYLES keys are uppercase) —
 * duplicated here rather than exporting BookingCard's version, since
 * that component intentionally isn't being refactored this phase
 * (per the Step 14 decision to leave it untouched).
 */
export default function AdminStatusBadge({ status }) {
  const key = status?.toUpperCase()
  const label = BOOKING_STATUS_LABELS[key] ?? status
  const styles = BOOKING_STATUS_STYLES[key] ?? 'bg-gray-100 text-gray-700'

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {label}
    </span>
  )
}