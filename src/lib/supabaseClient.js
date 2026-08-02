import { createClient } from '@supabase/supabase-js'

/**
 * Single Supabase client instance for the whole app.
 *
 * SECURITY: this file must only ever read the anon/publishable key.
 * The service-role key must never appear in frontend code, this file
 * included — it belongs only in server-side/admin tooling outside
 * this repo.
 *
 * Fails fast and loudly if env vars are missing, rather than letting
 * every downstream Supabase call fail with an opaque network/auth
 * error deep inside a component.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Ensure VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_PUBLISHABLE_KEY are set in your .env file. ' +
      'See .env.example for reference.',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)