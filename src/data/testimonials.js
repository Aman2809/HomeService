/**
 * Real customer testimonials/reviews.
 *
 * INTENTIONALLY EMPTY — no reviews, names, or ratings have been invented
 * (requirement #30). Populate this array only with genuine testimonial
 * data when it's provided; the shape below documents what each entry
 * should look like so RatingStars and the future Testimonials section
 * can render real data as soon as it's added.
 *
 * Expected shape once populated:
 * {
 *   id: string,
 *   customer_name: string,
 *   area: string,            // e.g. 'Tollygunge' — matches a serviceAreas slug/name
 *   rating: number,          // 1–5
 *   review_text: string,
 *   service_slug?: string,   // optional link to a services.js entry
 *   date?: string,           // ISO date the review was given
 *   featured?: boolean,      // whether to prioritize showing this one
 *   active: boolean,
 * }
 */
export const testimonials = []