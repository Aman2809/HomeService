import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { businessConfig } from '../constants/businessConfig.js'
import { termsSections } from '../data/legalContent.js'

const LAST_UPDATED = 'July 2026'

export default function Terms() {
  useDocumentTitle('Terms & Conditions')

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Terms & Conditions</p>
      <h1 className="mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">
        Terms of Using This Website
      </h1>
      <p className="mt-4 text-sm text-navy-700/80">Last updated: {LAST_UPDATED}</p>
      <p className="mt-4 text-navy-700">
        These terms explain how service requests made through {businessConfig.businessName} work.
      </p>

      <div className="mt-10 space-y-10">
        {termsSections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 id={section.id} className="text-lg font-semibold text-navy-950">
              {section.heading}
            </h2>
            <div className="mt-2 space-y-3">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-navy-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}