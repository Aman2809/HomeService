import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import { businessConfig } from '../../constants/businessConfig.js'

export default function AreasServedPreview() {
  const { serviceAreas } = useServiceCatalogue()

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">Areas We Serve</h2>
        <p className="mt-2 max-w-2xl text-navy-700">
          Currently serving selected areas of {businessConfig.serviceRegion}.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {serviceAreas.map((area) => (
            <span
              key={area.id}
              className="flex items-center gap-1.5 rounded-full border border-navy-950/10 bg-white px-4 py-2.5 text-sm font-medium text-navy-900"
            >
              <MapPin className="h-4 w-4 text-gold-600" />
              {area.name}
            </span>
          ))}
        </div>

        <Link
          to="/areas"
          className="mt-6 inline-block rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-900"
        >
          View Service Areas
        </Link>
      </div>
    </section>
  )
}