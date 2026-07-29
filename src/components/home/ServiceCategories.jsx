import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import { getCategoryIcon } from '../../constants/serviceIcons.js'

export default function ServiceCategories() {
  const { categories } = useServiceCatalogue()

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">Service Categories</h2>
        <p className="mt-2 max-w-2xl text-navy-700">
          Explore what we offer, from in-house electrical expertise to trusted partner services.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category)
            const isPartnerNetwork = category.fulfilled_by === 'trusted_network'

            return (
              <Link
                key={category.id}
                to={`/services?category=${category.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600">
                  <Icon className="h-7 w-7" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-navy-950">{category.name}</h3>
                    {isPartnerNetwork && (
                      <span className="rounded-full bg-navy-950/5 px-2.5 py-0.5 text-[11px] font-medium text-navy-700">
                        Trusted Partner Network
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-navy-700">{category.description}</p>
                  <span className="mt-3 flex items-center gap-1 text-sm font-medium text-navy-900 group-hover:text-gold-600">
                    View Services
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}