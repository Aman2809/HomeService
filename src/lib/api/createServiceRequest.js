import { supabase } from '../supabaseClient.js'

/**
 * Submits a service request via the create_service_request RPC.
 *
 * All server-side authority (reference generation, status, user_id,
 * item snapshots) lives in the Postgres function — this wrapper only
 * shapes the JS payload into the function's parameter names and
 * returns Supabase's { data, error } untouched so the caller can
 * decide how to handle failure.
 */
export async function createServiceRequest(payload) {
  const { data, error } = await supabase.rpc('create_service_request', {
    p_customer_name: payload.customer_name,
    p_phone: payload.phone,
    p_email: payload.email,
    p_area_id: payload.area_id,
    p_address: payload.address,
    p_landmark: payload.landmark,
    p_preferred_date: payload.preferred_date,
    p_preferred_time: payload.preferred_time,
    p_description: payload.description,
    p_items: payload.items,
  })

  return { data, error }
}