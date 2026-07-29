import { Link } from 'react-router-dom'
import { MapPin, Phone, MessageCircle } from 'lucide-react'
import { useServiceCatalogue } from '../hooks/useServiceCatalogue.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { businessConfig } from '../constants/businessConfig.js'
import { buildWhatsAppLink } from '../utils/whatsapp.js'

export default function Areas() {
  useDocumentTitle('Service Areas')
  const { serviceAreas } = useServiceCatalogue()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Service Areas</p>
      <h1 className="mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">
        Currently Serving Selected Areas of {businessConfig.serviceRegion}
      </h1>
      <p className="mt-4 max-w-2xl text-navy-700">
        We accept service requests for the areas listed below. If your area isn't listed yet,
        service availability isn't guaranteed — feel free to contact us to check.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {serviceAreas.map((area) => (
          <span
            key={area.id}
            className="flex items-center gap-2 rounded-full border border-navy-950/10 bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-sm"
          >
            <MapPin className="h-4 w-4 text-gold-600" />
            {area.name}
          </span>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-navy-950/10 bg-surface p-6">
        <h2 className="text-base font-semibold text-navy-950">Ready to book a service?</h2>
        <p className="mt-1 text-sm text-navy-700">
          Select your area when placing a request, and our team will confirm details and availability.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/services"
            className="rounded-full bg-gold-500 px-6 py-3 text-center text-sm font-semibold text-navy-950 hover:bg-gold-400"
          >
            Browse Services
          </Link>
          <a
            href={`tel:${businessConfig.phone}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy-950/15 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <a
            href={buildWhatsAppLink(businessConfig.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}