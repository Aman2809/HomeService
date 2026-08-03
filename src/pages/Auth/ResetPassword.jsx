import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthField from '../../components/auth/AuthField.jsx'

export default function ResetPassword() {
  const { user, loading, updatePassword } = useAuth()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)

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

    const { error: updateError } = await updatePassword(password)

    if (updateError) {
      setError('We couldn\u2019t update your password. Please request a new reset link.')
      setSubmitting(false)
      return
    }

    setDone(true)
    setSubmitting(false)
  }

  // AuthContext's initial session check is still running — avoid a
  // premature "invalid link" flash before we actually know.
  if (loading) {
    return <AuthLayout title="Reset Password">
      <p className="text-sm text-navy-700">Checking your reset link…</p>
    </AuthLayout>
  }

  // A valid recovery link establishes a session via onAuthStateChange
  // (PASSWORD_RECOVERY event) before this page is of any use — no
  // session here means the link is missing, expired, or already used.
  if (!user) {
    return (
      <AuthLayout title="Reset Link Invalid or Expired">
        <p className="text-sm text-navy-700">
          This password reset link is no longer valid. Please request a new one.
        </p>
        <Link
          to="/forgot-password"
          className="mt-6 block rounded-full bg-gold-500 py-3 text-center text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          Request New Link
        </Link>
      </AuthLayout>
    )
  }

  if (done) {
    return (
      <AuthLayout title="Password Updated">
        <p className="text-sm text-navy-700">Your password has been changed successfully.</p>
        <button
          type="button"
          onClick={() => navigate('/account', { replace: true })}
          className="mt-6 w-full rounded-full bg-gold-500 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          Continue to My Account
        </button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Reset Password" subtitle="Choose a new password for your account.">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthField
          id="password"
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          minLength={6}
        />
        <AuthField
          id="confirmPassword"
          label="Confirm New Password"
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
          {submitting ? 'Updating…' : 'Update Password'}
        </button>
      </form>
    </AuthLayout>
  )
}