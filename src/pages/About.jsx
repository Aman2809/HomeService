import { Link } from 'react-router-dom'
import { Phone, MessageCircle } from 'lucide-react'
import { useServiceCatalogue } from '../hooks/useServiceCatalogue.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { getCategoryIcon } from '../constants/serviceIcons.js'
import { businessConfig } from '../constants/businessConfig.js'
import { buildWhatsAppLink } from '../utils/whatsapp.js'
import { experienceParagraphs } from '../data/aboutContent.js'

export default function About() {
  useDocumentTitle('About Us')
  const { categories } = useServiceCatalogue()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">About Us</p>
      <h1 className="mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">
        {businessConfig.experienceYears}+ Years of Hands-On Experience
      </h1>

      <div className="mt-6 space-y-4">
        {experienceParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-navy-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold text-navy-950">How We Work</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category)
          const isPartnerNetwork = category.fulfilled_by === 'trusted_network'

          return (
            <div key={category.id} className="rounded-2xl border border-navy-950/10 bg-white p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy-950">{category.name}</h3>
              <p className="mt-1.5 text-sm text-navy-700">
                {isPartnerNetwork
                  ? `${category.name} requests are handled through a trusted network of independent technicians we work with, so you can rely on the same simple booking process.`
                  : `${category.name} work is our primary, in-house expertise — handled directly, with the experience described above.`}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-navy-950/10 bg-surface p-6">
        <h2 className="text-base font-semibold text-navy-950">Have a repair or installation in mind?</h2>
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