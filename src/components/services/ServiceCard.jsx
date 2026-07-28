import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getServiceIcon } from '../../constants/serviceIcons.js'
import { getPricingLabel } from '../../utils/formatPricing.js'
import ServiceOptionModal from './ServiceOptionModal.jsx'

export default function ServiceCard({ service, category }) {
  const Icon = getServiceIcon(service, category)
  const isPartnerNetwork = category?.fulfilled_by === 'trusted_network'
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="group flex flex-col rounded-2xl border border-navy-950/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600">
          <Icon className="h-6 w-6" />
        </span>
        {isPartnerNetwork && (
          <span className="rounded-full bg-navy-950/5 px-2.5 py-1 text-[11px] font-medium text-navy-700">
            Trusted Partner Network
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold text-navy-950">{service.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-navy-700">{service.short_description}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-navy-900">{getPricingLabel(service)}</span>
        <Link
          to={`/services/${service.slug}`}
          className="text-sm font-medium text-navy-700 underline-offset-2 hover:text-navy-950 hover:underline"
        >
          View Details
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="mt-3 w-full rounded-full bg-navy-950 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-500 hover:text-navy-950"
      >
        Book
      </button>

      <ServiceOptionModal open={modalOpen} serviceId={service.id} onClose={() => setModalOpen(false)} />
    </div>
  )
}