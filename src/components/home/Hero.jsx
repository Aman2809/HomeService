import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Zap, ShieldCheck, Wrench } from 'lucide-react'
import { businessConfig } from '../../constants/businessConfig.js'
import { buildWhatsAppLink } from '../../utils/whatsapp.js'

export default function Hero() {
  return (
    <section className="bg-navy-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gold-400">
            Serving {businessConfig.serviceRegion}
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Reliable Home Services, Right at Your Doorstep
          </h1>

          <p className="mt-4 max-w-lg text-base text-white/75 sm:text-lg">
            Electrical repairs, installations and trusted home-service assistance across selected{' '}
            {businessConfig.serviceRegion} areas, backed by {businessConfig.experienceYears}+ years
            of hands-on experience.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/services"
              className="rounded-full bg-gold-500 px-6 py-3.5 text-center text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
            >
              Book a Service
            </Link>
            <div className="flex gap-3">
              <a
                href={`tel:${businessConfig.phone}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/20 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <a
                href={buildWhatsAppLink(businessConfig.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Decorative hero visual — placeholder composition using icons
            until real business photography is available (see project
            config for how to swap this out). */}
        <div className="hidden lg:block" aria-hidden="true">
          <div className="relative mx-auto flex h-80 w-80 items-center justify-center rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900">
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-gold-500">
              <Zap className="h-14 w-14 text-navy-950" fill="currentColor" />
            </span>
            <span className="absolute left-4 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
              <Wrench className="h-6 w-6 text-navy-900" />
            </span>
            <span className="absolute bottom-8 right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
              <ShieldCheck className="h-6 w-6 text-navy-900" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}