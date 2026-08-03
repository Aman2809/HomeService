import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { getProfile, updateProfile } from '../../lib/api/profile.js'
import AuthField from '../../components/auth/AuthField.jsx'

export default function Account() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let isMounted = true

    getProfile(user.id).then(({ data, error: fetchError }) => {
      if (!isMounted) return
      if (fetchError) {
        setError('We couldn\u2019t load your profile. Please refresh the page.')
      } else {
        setFullName(data.full_name ?? '')
        setPhone(data.phone ?? '')
      }
      setLoading(false)
    })

    return () => { isMounted = false }
  }, [user.id])

  async function handleSave(e) {
    e.preventDefault()
    if (saving) return
    setSaving(true)
    setError(null)
    setSaved(false)

    const { error: updateError } = await updateProfile(user.id, { fullName: fullName.trim(), phone: phone.trim() })

    if (updateError) {
      setError('We couldn\u2019t save your changes. Please try again.')
    } else {
      setSaved(true)
    }
    setSaving(false)
  }

  async function handleLogout() {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-navy-950">My Account</h1>

      <section className="mt-6 rounded-2xl border border-navy-950/10 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-950">Profile</h2>

        {loading ? (
          <p className="mt-4 text-sm text-navy-700">Loading your profile…</p>
        ) : (
          <form onSubmit={handleSave} className="mt-4 space-y-4">
            <AuthField
              id="fullName"
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
            <AuthField
              id="phone"
              label="Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
            <div>
              <label className="block text-sm font-medium text-navy-950">Email</label>
              <p className="mt-1.5 rounded-xl border border-navy-950/10 bg-navy-950/[0.03] px-4 py-2.5 text-sm text-navy-700">
                {user.email}
              </p>
            </div>

            {error && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}
            {saved && (
              <p className="text-sm font-medium text-emerald-600">
                Profile updated.
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-950 transition-colors enabled:hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        )}
      </section>

      <section className="mt-6 rounded-2xl border border-navy-950/10 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-950">Bookings</h2>
        <p className="mt-2 text-sm text-navy-700">
          View the status of your service requests and past bookings.
        </p>
        <Link
          to="/account/bookings"
          className="mt-4 inline-block rounded-full border border-navy-950/15 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          View My Bookings
        </Link>
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 w-full rounded-full border border-navy-950/15 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
      >
        Logout
      </button>
    </div>
  )
}