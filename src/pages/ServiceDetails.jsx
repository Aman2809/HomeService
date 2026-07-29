import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Phone, MessageCircle, CheckCircle2 } from 'lucide-react'
import { useServiceCatalogue } from '../hooks/useServiceCatalogue.js'
import { getServiceIcon } from '../constants/serviceIcons.js'
import { getPricingLabel } from '../utils/formatPricing.js'
import { businessConfig } from '../constants/businessConfig.js'
import { buildWhatsAppLink } from '../utils/whatsapp.js'
import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Accordion from '../components/common/Accordion.jsx'
import ServiceCard from '../components/services/ServiceCard.jsx'
import ServiceOptionModal from '../components/services/ServiceOptionModal.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

const HOW_IT_WORKS = [
    "Submit your request online or over WhatsApp — no account needed.",
    'Our team contacts you to confirm the appointment.',
    "A technician visits, assesses the work, and confirms the price if it wasn't already fixed.",
    'The work is completed and your request is marked complete.',
]

export default function ServiceDetails() {
    const { slug } = useParams()
    const { getServiceBySlug, categories, getOptionsForService, getServicesByCategory, faqs } =
        useServiceCatalogue()
    const [modalOpen, setModalOpen] = useState(false)

    const service = getServiceBySlug(slug)
    useDocumentTitle(service ? service.name : 'Service Not Found')

    if (!service) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <EmptyState
                    title="Service not found"
                    description="This service may have been renamed, removed, or is temporarily unavailable."
                    action={{ label: 'Browse All Services', to: '/services' }}
                />
            </div>
        )
    }

    const category = categories.find((c) => c.id === service.category_id)
    const Icon = getServiceIcon(service, category)
    const options = getOptionsForService(service.id)
    const relatedServices = category
        ? getServicesByCategory(category.slug).filter((s) => s.id !== service.id).slice(0, 3)
        : []
    const isPartnerNetwork = category?.fulfilled_by === 'trusted_network'
    const whatsappMessage = `Hello, I'd like to know more about ${service.name}.`

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <Breadcrumbs
                items={[
                    { label: 'Home', to: '/' },
                    { label: 'Services', to: '/services' },
                    ...(category ? [{ label: category.name, to: `/services?category=${category.slug}` }] : []),
                    { label: service.name },
                ]}
            />

            <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="flex items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600">
                            <Icon className="h-7 w-7" />
                        </span>
                        <div>
                            {category && (
                                <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                                    {category.name}
                                </p>
                            )}
                            <h1 className="mt-1 text-2xl font-bold text-navy-950 sm:text-3xl">{service.name}</h1>
                            {isPartnerNetwork && (
                                <span className="mt-2 inline-block rounded-full bg-navy-950/5 px-3 py-1 text-xs font-medium text-navy-700">
                                    Delivered via our trusted technician network
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="mt-6 leading-relaxed text-navy-700">{service.description}</p>

                    {options.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-base font-semibold text-navy-950">Available Options</h2>
                            <p className="mt-1 text-sm text-navy-700">
                                You'll choose the exact option and quantity when you book.
                            </p>
                            <ul className="mt-3 flex flex-wrap gap-2">
                                {options.map((option) => (
                                    <li
                                        key={option.id}
                                        className="rounded-full border border-navy-950/10 bg-navy-950/[0.03] px-3.5 py-2 text-sm font-medium text-navy-800"
                                    >
                                        {option.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-10">
                        <h2 className="text-base font-semibold text-navy-950">How Booking Works</h2>
                        <ul className="mt-3 space-y-3">
                            {HOW_IT_WORKS.map((step) => (
                                <li key={step} className="flex items-start gap-2.5 text-sm text-navy-700">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {faqs.length > 0 && (
                        <div className="mt-10">
                            <h2 className="text-base font-semibold text-navy-950">Frequently Asked Questions</h2>
                            <div className="mt-3">
                                <Accordion items={faqs} />
                            </div>
                        </div>
                    )}
                </div>

                <aside className="lg:col-span-1">
                    <div className="sticky top-24 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-sm">
                        <p className="text-sm text-navy-700">Pricing</p>
                        <p className="mt-1 text-lg font-bold text-navy-950">{getPricingLabel(service)}</p>

                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="mt-5 flex w-full items-center justify-center rounded-full bg-gold-500 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400"
                        >
                            Book This Service
                        </button>

                        <div className="mt-3 flex gap-2">
                            <a
                                href={`tel:${businessConfig.phone}`}
                                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy-950/15 py-2.5 text-sm font-medium text-navy-900"
                            >
                                <Phone className="h-4 w-4" />
                                Call
                            </a>

                            <a
                                href={buildWhatsAppLink(businessConfig.whatsapp, whatsappMessage)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-2.5 text-sm font-medium text-white"
                            >
                                <MessageCircle className="h-4 w-4" />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </aside>
            </div>

            {relatedServices.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-xl font-bold text-navy-950">Other {category.name} Services</h2>
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {relatedServices.map((related) => (
                            <ServiceCard key={related.id} service={related} category={category} />
                        ))}
                    </div>
                </div>
            )}

            <ServiceOptionModal open={modalOpen} serviceId={service.id} onClose={() => setModalOpen(false)} />
        </div>
    )
}