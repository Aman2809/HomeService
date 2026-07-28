/**
 * Canonical booking status values (requirement #46).
 * Defined now so booking objects built in Phase 1 already match the
 * shape the Supabase `service_requests.status` column will use.
 */
export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
}

export const BOOKING_STATUS_LABELS = {
  [BOOKING_STATUS.PENDING]: 'Pending',
  [BOOKING_STATUS.CONFIRMED]: 'Confirmed',
  [BOOKING_STATUS.ASSIGNED]: 'Assigned',
  [BOOKING_STATUS.IN_PROGRESS]: 'In Progress',
  [BOOKING_STATUS.COMPLETED]: 'Completed',
  [BOOKING_STATUS.CANCELLED]: 'Cancelled',
}

// Tailwind class fragments for status badges — used by the customer
// dashboard and admin dashboard in later phases.
export const BOOKING_STATUS_STYLES = {
  [BOOKING_STATUS.PENDING]: 'bg-amber-100 text-amber-800',
  [BOOKING_STATUS.CONFIRMED]: 'bg-blue-100 text-blue-800',
  [BOOKING_STATUS.ASSIGNED]: 'bg-indigo-100 text-indigo-800',
  [BOOKING_STATUS.IN_PROGRESS]: 'bg-purple-100 text-purple-800',
  [BOOKING_STATUS.COMPLETED]: 'bg-emerald-100 text-emerald-800',
  [BOOKING_STATUS.CANCELLED]: 'bg-gray-200 text-gray-700',
}