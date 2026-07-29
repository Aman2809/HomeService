import { Star } from 'lucide-react'

/**
 * Renders a 1–5 star rating. Built now so real testimonial data
 * (src/data/testimonials.js) can be displayed as soon as it's added,
 * without needing a new component then.
 */
export default function RatingStars({ rating, size = 16 }) {
  const rounded = Math.round(rating)

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          width={size}
          height={size}
          className={index < rounded ? 'fill-gold-500 text-gold-500' : 'fill-transparent text-navy-950/20'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}