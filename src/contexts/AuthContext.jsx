import { createContext, useContext, useEffect, useState, useMemo } from 'react'
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
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    // Initial session read — resolves from persisted storage without
    // a network round-trip in the common case.
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (!isMounted) return
      setSession(initialSession)
      setLoading(false)
    })

    // Covers all subsequent changes: sign in, sign out, token refresh,
    // and the recovery session established after a password-reset
    // email link is followed.
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

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,

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
    [session, loading],
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