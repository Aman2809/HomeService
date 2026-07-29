import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import RatingStars from '../common/RatingStars.jsx'

/**
 * Renders nothing at all when there are no real testimonials —
 * no heading, no placeholder cards. Appears automatically once
 * src/data/testimonials.js has real entries.
 */
export default function TestimonialsSection() {
  const { testimonials } = useServiceCatalogue()

  if (testimonials.length === 0) return null

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">What Our Customers Say</h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review) => (
            <div key={review.id} className="rounded-2xl border border-navy-950/10 bg-white p-6">
              <RatingStars rating={review.rating} />
              <p className="mt-3 text-sm text-navy-800">{review.review_text}</p>
              <p className="mt-4 text-sm font-semibold text-navy-950">
                {review.customer_name}
                {review.area && <span className="font-normal text-navy-700">, {review.area}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}