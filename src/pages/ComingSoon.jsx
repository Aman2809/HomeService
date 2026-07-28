/**
 * TEMPORARY placeholder used only so routes have somewhere to render
 * during Step 1 (layout shell verification). Each route below will be
 * replaced with its real page component in upcoming steps.
 */



export default function ComingSoon({ title }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
        Under construction
      </p>
      <h1 className="mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-navy-700">
        This page will be built in an upcoming step.
      </p>
    </div>
  )
}