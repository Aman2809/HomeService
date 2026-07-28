import { Phone, MessageCircle, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { businessConfig } from '../../constants/businessConfig.js'
import { buildWhatsAppLink } from '../../utils/whatsapp.js'
import BasketBadge from '../booking/BasketBadge.jsx'

export default function StickyMobileCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-2 border-t border-navy-950/10 bg-white px-3 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] lg:hidden"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={`tel:${businessConfig.phone}`}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy-950/15 py-2.5 text-sm font-semibold text-navy-900"
        aria-label="Call us"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>

      <a
        href={buildWhatsAppLink(businessConfig.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-2.5 text-sm font-semibold text-white"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <Link
        to="/book"
        className="relative flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gold-500 py-2.5 text-sm font-semibold text-navy-950"
        aria-label="Book a service"
      >
        <CalendarCheck className="h-4 w-4" />
        Book
        <BasketBadge className="absolute -right-1 -top-1" />
      </Link>
    </div>
  )
}