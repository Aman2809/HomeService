import { useState, useEffect } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthField from '../../components/auth/AuthField.jsx'

export default function AdminLogin() {
  const { user, isAdmin, loading, signIn, checkAdminStatus, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [notAuthorized, setNotAuthorized] = useState(false)

  // Handles the "already logged in as an admin, visiting /admin/login
  // again" case (e.g. via the new Footer link). If a session exists
  // but isAdmin hasn't been checked yet in this session (null), run
  // the check once so a returning admin is still redirected without
  // needing to re-enter credentials — this reuses checkAdminStatus(),
  // the same function AdminProtectedRoute already relies on, not new
  // auth logic.
  useEffect(() => {
    if (user && isAdmin === null) {
      checkAdminStatus()
    }
  }, [user, isAdmin, checkAdminStatus])

  const redirectTo = location.state?.from?.pathname ?? '/admin'

  // Session still resolving, or an admin-check triggered by the effect
  // above is in flight — avoid rendering the form prematurely.
  if (loading || (user && isAdmin === null)) {
    return (
      <AuthLayout title="Admin Login">
        <p className="text-sm text-navy-700">Loading…</p>
      </AuthLayout>
    )
  }

  // Already authenticated AND already confirmed admin — skip the form
  // entirely. Non-admins fall through to the normal form below
  // unchanged (they can still attempt login / see the existing
  // not-authorized messaging if they try).
  if (user && isAdmin === true) {
    return <Navigate to={redirectTo} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    setNotAuthorized(false)

    const { error: signInError } = await signIn({ email, password })

    if (signInError) {
      setError('Incorrect email or password. Please try again.')
      setSubmitting(false)
      return
    }

    const admin = await checkAdminStatus()

    if (!admin) {
      setNotAuthorized(true)
      setSubmitting(false)
      return
    }

    navigate(redirectTo, { replace: true })
  }

  async function handleSignOutAndRetry() {
    await signOut()
    setNotAuthorized(false)
    setEmail('')
    setPassword('')
  }

  if (notAuthorized) {
    return (
      <AuthLayout title="Not Authorized">
        <p className="text-sm text-navy-700">
          This account ({user?.email}) is signed in but does not have admin access.
        </p>
        <button
          type="button"
          onClick={handleSignOutAndRetry}
          className="mt-6 w-full rounded-full border border-navy-950/15 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          Sign Out and Try a Different Account
        </button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Admin Login" subtitle="Restricted access for authorized staff only.">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {error && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-navy-950 py-3 text-sm font-semibold text-white transition-colors enabled:hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </AuthLayout>
  )
}