import { howItWorksSteps } from '../../data/homeContent.js'

export default function HowItWorks() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">How It Works</h2>

        <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <li key={step.id} className="rounded-2xl border border-navy-950/10 bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy-950">{step.title}</h3>
              <p className="mt-1.5 text-sm text-navy-700">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-navy-700/80">
          Submitting a request does not confirm an appointment — our team will reach out to confirm
          details and availability.
        </p>
      </div>
    </section>
  )
}