/**
 * Defines which status transitions are offered in the admin UI.
 * This is a UI-level convenience only — it does NOT enforce anything
 * server-side. admin_update_request_status() itself only validates
 * that p_new_status is one of the five known values; it does not
 * restrict which transitions are allowed. That's a deliberate choice
 * (kept here, not pushed into the RPC) so an admin can always correct
 * a mistake (e.g. accidentally-cancelled → pending) without needing a
 * schema/RPC change — this file can be edited freely without touching
 * the database.
 */
const TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['in_progress', 'cancelled'],
  in_progress: ['completed', 'cancelled'],
  completed: [],
  cancelled: ['pending'],
}

export function getAllowedNextStatuses(currentStatus) {
  return TRANSITIONS[currentStatus] ?? []
}