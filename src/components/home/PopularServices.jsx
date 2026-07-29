import { Link } from 'react-router-dom'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import ServiceCard from '../services/ServiceCard.jsx'

export default function PopularServices() {
  const { getFeaturedServices, categories } = useServiceCatalogue()
  const featuredServices = getFeaturedServices()

  if (featuredServices.length === 0) return null

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">Popular Services</h2>
            <p className="mt-2 text-navy-700">
              A few of the most requested electrical and home services.
            </p>
          </div>
          <Link
            to="/services"
            className="hidden text-sm font-semibold text-navy-900 hover:text-gold-600 sm:block"
          >
            View All Services →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredServices.map((service) => {
            const category = categories.find((c) => c.id === service.category_id)
            return <ServiceCard key={service.id} service={service} category={category} />
          })}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            to="/services"
            className="block w-full rounded-full border border-navy-950/15 py-3 text-center text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}