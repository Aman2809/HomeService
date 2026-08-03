import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthField from '../../components/auth/AuthField.jsx'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [confirmationPending, setConfirmationPending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    setError(null)

    const { data, error: signUpError } = await signUp({
      email,
      password,
      fullName: fullName.trim(),
    })

    if (signUpError) {
      setError(
        signUpError.message?.toLowerCase().includes('already registered')
          ? 'An account with this email already exists.'
          : 'We couldn\u2019t create your account. Please try again.',
      )
      setSubmitting(false)
      return
    }

    // If email confirmation is required by the Supabase project's auth
    // settings, signUp succeeds but returns no active session — show a
    // "check your email" state instead of navigating into the app.
    if (data.session) {
      navigate('/account', { replace: true })
    } else {
      setConfirmationPending(true)
    }

    setSubmitting(false)
  }

  if (confirmationPending) {
    return (
      <AuthLayout title="Check your email">
        <p className="text-sm text-navy-700">
          We&apos;ve sent a confirmation link to <strong>{email}</strong>. Please confirm your
          email to finish creating your account, then log in.
        </p>
        <Link
          to="/login"
          className="mt-6 block rounded-full bg-gold-500 py-3 text-center text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          Go to Login
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Create an Account" subtitle="Book faster and track your service requests.">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthField
          id="fullName"
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />
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
          autoComplete="new-password"
          minLength={6}
        />
        <AuthField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          minLength={6}
        />

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
          {submitting ? 'Creating account…' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-700">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-navy-950 hover:text-gold-500">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}