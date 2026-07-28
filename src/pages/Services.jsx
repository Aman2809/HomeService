import { useSearchParams } from 'react-router-dom'
import { useServiceCatalogue } from '../hooks/useServiceCatalogue.js'
import CategoryFilter from '../components/services/CategoryFilter.jsx'
import ServiceCard from '../components/services/ServiceCard.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { businessConfig } from '../constants/businessConfig.js'

export default function Services() {
  const { categories, getServicesByCategory } = useServiceCatalogue()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSlug = searchParams.get('category') ?? 'all'

  function handleCategoryChange(slug) {
    if (slug === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', slug)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const sectionsToShow =
    activeSlug === 'all' ? categories : categories.filter((c) => c.slug === activeSlug)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Our Services</p>
        <h1 className="mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">
          Electrical & Home Services in {businessConfig.serviceRegion}
        </h1>
        <p className="mt-3 text-navy-700">
          Browse our electrical services, backed by {businessConfig.experienceYears}+ years of
          hands-on experience, plus AC services coordinated through our trusted technician network.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <CategoryFilter categories={categories} activeSlug={activeSlug} onChange={handleCategoryChange} />

        <div className="flex-1 space-y-12">
          {sectionsToShow.length === 0 && (
            <EmptyState
              title="No services found"
              description="This category doesn't have any active services right now."
              action={{ label: 'View All Services', to: '/services' }}
            />
          )}

          {sectionsToShow.map((category) => {
            const categoryServices = getServicesByCategory(category.slug)
            return (
              <section key={category.id} aria-labelledby={`category-${category.slug}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 id={`category-${category.slug}`} className="text-xl font-bold text-navy-950">
                    {category.name}
                  </h2>
                  {category.fulfilled_by === 'trusted_network' && (
                    <span className="rounded-full bg-navy-950/5 px-3 py-1 text-xs font-medium text-navy-700">
                      Via our trusted technician network
                    </span>
                  )}
                </div>
                <p className="mt-1 max-w-2xl text-sm text-navy-700">{category.description}</p>

                {categoryServices.length === 0 ? (
                  <div className="mt-5">
                    <EmptyState
                      title="No services available yet"
                      description="Check back soon — services for this category are being added."
                    />
                  </div>
                ) : (
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {categoryServices.map((service) => (
                      <ServiceCard key={service.id} service={service} category={category} />
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}