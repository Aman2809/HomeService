import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyBookings } from '../../lib/api/myBookings.js'
import BookingCard from '../../components/account/BookingCard.jsx'

export default function AccountBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    getMyBookings().then(({ data, error: fetchError }) => {
      if (!isMounted) return
      if (fetchError) {
        setError('We couldn\u2019t load your bookings. Please refresh the page.')
      } else {
        setBookings(data ?? [])
      }
      setLoading(false)
    })

    return () => { isMounted = false }
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-950">My Bookings</h1>
        <Link to="/account" className="text-sm font-medium text-navy-700 hover:text-navy-950">
          Back to Account
        </Link>
      </div>

      {loading && <p className="mt-6 text-sm text-navy-700">Loading your bookings…</p>}

      {error && (
        <p role="alert" className="mt-6 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="mt-6 rounded-2xl border border-navy-950/10 bg-white p-8 text-center">
          <p className="text-sm text-navy-700">You haven&apos;t made any service requests yet.</p>
          <Link
            to="/book"
            className="mt-4 inline-block rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
          >
            Book a Service
          </Link>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  )
}