/**
 * Shared centered-card layout for all four auth pages, matching the
 * existing rounded-2xl / border-navy-950/10 card language used
 * throughout the booking flow (see StepReview.jsx, BookingSuccess.jsx).
 */
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div className="rounded-2xl border border-navy-950/10 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-navy-950">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-navy-700">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}