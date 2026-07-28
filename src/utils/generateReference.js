/**
 * Temporary FRONTEND-ONLY reference generator for Phase 1.
 * NOT authoritative or guaranteed unique/secure — once Supabase is
 * integrated, reference generation moves to the database/backend layer
 * (e.g. a Postgres sequence or function), and this file goes away.
 */
export function generateBookingReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no ambiguous 0/O/1/I
  let suffix = ''
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)]
  }
  return `HS-${suffix}`
}