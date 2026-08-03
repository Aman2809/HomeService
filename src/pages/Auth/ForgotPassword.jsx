import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthField from '../../components/auth/AuthField.jsx'

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth()

  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)

    const { error: resetError } = await requestPasswordReset(email)

    // Supabase does not indicate whether the email exists — deliberately
    // shown as a generic success state either way to avoid confirming
    // or denying account existence to the visitor.
    if (resetError) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
      return
    }

    setSent(true)
    setSubmitting(false)
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email">
        <p className="text-sm text-navy-700">
          If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link.
        </p>
        <Link
          to="/login"
          className="mt-6 block rounded-full border border-navy-950/15 py-3 text-center text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          Back to Login
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="We'll email you a link to reset it.">
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
          {submitting ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-700">
        Remembered your password?{' '}
        <Link to="/login" className="font-semibold text-navy-950 hover:text-gold-500">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}