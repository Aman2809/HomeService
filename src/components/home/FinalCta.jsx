import { Link } from 'react-router-dom'
import { Phone, MessageCircle } from 'lucide-react'
import { businessConfig } from '../../constants/businessConfig.js'
import { buildWhatsAppLink } from '../../utils/whatsapp.js'

export default function FinalCta() {
  return (
    <section className="bg-navy-950">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Need help with a repair or installation?
        </h2>
        <p className="mt-3 text-white/75">
          Book a service request online or contact us directly.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/services"
            className="rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
          >
            Book a Service
          </Link>
          <a
            href={`tel:${businessConfig.phone}`}
            className="flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/5"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <a
            href={buildWhatsAppLink(businessConfig.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}