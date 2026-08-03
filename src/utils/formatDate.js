/**
 * Consistent short date format for admin views. Separate from any
 * customer-facing date formatting so each can evolve independently.
 */
export function formatShortDate(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}