import { supabase } from '../supabaseClient.js'

const PAGE_SIZE = 20

const ACTIVE_STATUSES = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']

/**
 * All admin reads go through direct Supabase queries — RLS already
 * grants admins full SELECT on service_requests / service_request_items
 * / service_request_status_history via is_admin()-scoped policies, so
 * no RPC is needed for reads, only for the one write path (status
 * updates) that RLS does not (and per Step 14's decision, should not)
 * permit directly.
 */

/**
 * Dashboard summary counts, one per status. Uses `head: true` count
 * queries (no row data fetched) rather than fetching all rows and
 * counting client-side.
 */
export async function getDashboardCounts() {
  const results = await Promise.all(
    ACTIVE_STATUSES.map((status) =>
      supabase
        .from('service_requests')
        .select('id', { count: 'exact', head: true })
        .eq('status', status),
    ),
  )

  const firstError = results.find((r) => r.error)?.error ?? null

  const counts = ACTIVE_STATUSES.reduce((acc, status, i) => {
    acc[status] = results[i].count ?? 0
    return acc
  }, {})

  return { data: firstError ? null : counts, error: firstError }
}

/**
 * The N most recently created requests, for the dashboard's "recent
 * requests" section. Includes items so the same row-rendering used by
 * the full list can be reused without a second query shape.
 */
export async function getRecentRequests(limit = 8) {
  return supabase
    .from('service_requests')
    .select('*, service_request_items(*)')
    .order('created_at', { ascending: false })
    .limit(limit)
}

/**
 * Full requests list — paginated, filtered, and searched entirely
 * server-side so behavior stays correct regardless of page size or
 * total row count (never fetch-everything-then-filter-in-JS).
 *
 * @param {object} params
 * @param {number} [params.page=1] - 1-indexed page number
 * @param {string} [params.status] - exact status filter
 * @param {string} [params.areaId] - exact area_id filter
 * @param {string} [params.dateFrom] - preferred_date >= (YYYY-MM-DD)
 * @param {string} [params.dateTo] - preferred_date <= (YYYY-MM-DD)
 * @param {string} [params.search] - matched against customer_name,
 *   phone, and public_reference (case-insensitive, partial match)
 */
export async function getRequests({
  page = 1,
  status,
  areaId,
  dateFrom,
  dateTo,
  search,
} = {}) {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('service_requests')
    .select('*, service_request_items(*)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (status) {
    query = query.eq('status', status)
  }
  if (areaId) {
    query = query.eq('area_id', areaId)
  }
  if (dateFrom) {
    query = query.gte('preferred_date', dateFrom)
  }
  if (dateTo) {
    query = query.lte('preferred_date', dateTo)
  }
  if (search) {
    const term = search.trim()
    if (term) {
      const escaped = term.replace(/[%_]/g, '\\$&')
      query = query.or(
        `customer_name.ilike.%${escaped}%,phone.ilike.%${escaped}%,public_reference.ilike.%${escaped}%`,
      )
    }
  }

  const { data, error, count } = await query

  return {
    data,
    error,
    count: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    totalPages: count ? Math.ceil(count / PAGE_SIZE) : 0,
  }
}

/**
 * Single request with items AND status history, for the detail view.
 */
export async function getRequestById(id) {
  return supabase
    .from('service_requests')
    .select('*, service_request_items(*), service_request_status_history(*)')
    .eq('id', id)
    .single()
}

/**
 * The ONLY write path for status changes — routes through the
 * SECURITY DEFINER RPC rather than an UPDATE, since RLS intentionally
 * grants admins no direct UPDATE on service_requests (see Step 14
 * architecture notes).
 */
export async function updateRequestStatus(requestId, newStatus) {
  return supabase.rpc('admin_update_request_status', {
    p_request_id: requestId,
    p_new_status: newStatus,
  })
}