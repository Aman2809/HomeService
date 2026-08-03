import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthField from '../../components/auth/AuthField.jsx'

export default function AdminLogin() {
  const { user, isAdmin, signIn, checkAdminStatus, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [notAuthorized, setNotAuthorized] = useState(false)

  const redirectTo = location.state?.from?.pathname ?? '/admin'

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

    // Authentication succeeded — now confirm this account actually
    // has the admin role before letting them into /admin. A valid
    // login here does not by itself imply admin access.
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