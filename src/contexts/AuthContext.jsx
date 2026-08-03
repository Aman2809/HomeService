import { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const AuthContext = createContext(null)

/**
 * Auth state + actions, backed directly by supabase-js's own session
 * handling (persistSession/autoRefreshToken are supabase-js defaults —
 * this context does not reimplement storage or refresh logic, it only
 * exposes Supabase's session state to React).
 *
 * `loading` = true only during the initial session check on mount.
 * Individual auth actions (login/signup/etc.) manage their own
 * per-action loading state in the calling page, same pattern already
 * used in StepReview.jsx — this context does not track "submitting"
 * state for actions, only whether we know who (if anyone) is signed in.
 *
 * Admin authorization (`isAdmin`) is intentionally LAZY — unlike
 * `session`, it is not resolved on every login. It stays `null`
 * ("not yet checked") until something actually calls
 * `checkAdminStatus()` (only AdminProtectedRoute / AdminLogin do this).
 * This keeps the is_admin() RPC off the hot path for ordinary customer
 * sessions, per Step 13 Phase 1 decision — most sessions will never
 * trigger it at all.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const [isAdmin, setIsAdmin] = useState(null) // null = not yet checked
  const [adminLoading, setAdminLoading] = useState(false)

  // Tracks which user id the current isAdmin value belongs to, so a
  // repeated admin-route visit within the same session can reuse the
  // result instead of re-hitting the RPC every time.
  const adminCheckedForUserId = useRef(null)

  useEffect(() => {
    let isMounted = true

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (!isMounted) return
      setSession(initialSession)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!isMounted) return
        setSession(nextSession)
        setLoading(false)
      },
    )

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Whenever the underlying user changes (login, logout, switch
  // account), any previous admin-check result is invalidated — a
  // stale isAdmin from a prior session must never leak into a new
  // one, even though the check itself stays lazy.
  useEffect(() => {
    setIsAdmin(null)
    adminCheckedForUserId.current = null
  }, [session?.user?.id])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,

      isAdmin,
      adminLoading,

      /**
       * Resolves whether the current user is an admin, calling the
       * existing is_admin() RPC — never queries user_roles directly.
       * Safe to call repeatedly; only performs a network call the
       * first time for a given user id, or after a session change.
       * Fails CLOSED: any RPC error results in isAdmin = false, never
       * true, so a network hiccup can never accidentally grant access.
       */
      async checkAdminStatus() {
        if (!session?.user) {
          setIsAdmin(false)
          return false
        }

        if (adminCheckedForUserId.current === session.user.id && isAdmin !== null) {
          return isAdmin
        }

        setAdminLoading(true)
        const { data, error } = await supabase.rpc('is_admin')
        const result = !error && data === true

        setIsAdmin(result)
        adminCheckedForUserId.current = session.user.id
        setAdminLoading(false)
        return result
      },

      async signUp({ email, password, fullName }) {
        return supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        })
      },

      async signIn({ email, password }) {
        return supabase.auth.signInWithPassword({ email, password })
      },

      async signOut() {
        return supabase.auth.signOut()
      },

      async requestPasswordReset(email) {
        return supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
      },

      async updatePassword(newPassword) {
        return supabase.auth.updateUser({ password: newPassword })
      },
    }),
    [session, loading, isAdmin, adminLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}