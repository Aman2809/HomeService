import { CheckCircle2 } from 'lucide-react'
import { whyChooseUsPoints } from '../../data/homeContent.js'

export default function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">Why Choose Us</h2>
          <p className="mt-2 text-navy-700">
            A straightforward, local service built on real hands-on experience.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {whyChooseUsPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.5 rounded-xl bg-surface p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              <span className="text-sm text-navy-900">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}