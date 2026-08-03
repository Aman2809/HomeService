import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthField from '../../components/auth/AuthField.jsx'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Set by ProtectedRoute (Phase 3) when redirecting an unauthenticated
  // visitor here — falls back to /account if arriving directly.
  const redirectTo = location.state?.from?.pathname ?? '/account'

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)

    const { error: signInError } = await signIn({ email, password })

    if (signInError) {
      setError('Incorrect email or password. Please try again.')
      setSubmitting(false)
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <AuthLayout title="Login" subtitle="Access your account and booking history.">
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

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-navy-700 hover:text-navy-950">
            Forgot password?
          </Link>
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-gold-500 py-3 text-sm font-semibold text-navy-950 transition-colors enabled:hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Logging in…' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-700">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-semibold text-navy-950 hover:text-gold-500">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}