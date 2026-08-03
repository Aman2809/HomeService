import { supabase } from '../supabaseClient.js'

/**
 * Deliberately does NOT filter by user_id client-side — RLS on
 * service_requests (and the nested service_request_items) is the
 * actual authority on which rows are visible, consistent with the
 * server-side-authority approach used everywhere else in this app
 * (see create_service_request()). Adding a redundant .eq('user_id', …)
 * here would just duplicate logic RLS already enforces, not add
 * meaningful safety.
 */
export async function getMyBookings() {
  return supabase
    .from('service_requests')
    .select('*, service_request_items(*)')
    .order('created_at', { ascending: false })
}