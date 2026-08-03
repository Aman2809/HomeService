import { supabase } from '../supabaseClient.js'

/**
 * Profile access is UPDATE/SELECT only — profiles.profiles_select_own
 * and profiles_update_own RLS policies scope both to the caller's own
 * row (auth.uid() = id). No insert here: row creation is owned
 * entirely by the existing handle_new_user trigger.
 */
export async function getProfile(userId) {
  return supabase
    .from('profiles')
    .select('id, full_name, phone')
    .eq('id', userId)
    .single()
}

/**
 * Only full_name and phone are writable from this page — id/timestamps
 * are never sent, and email lives on auth.users, not profiles, so it
 * isn't part of this update.
 */
export async function updateProfile(userId, { fullName, phone }) {
  return supabase
    .from('profiles')
    .update({ full_name: fullName, phone })
    .eq('id', userId)
    .select('id, full_name, phone')
    .single()
}