import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Mail, MapPin, Zap } from 'lucide-react'
import { businessConfig } from '../../constants/businessConfig.js'
import { buildWhatsAppLink } from '../../utils/whatsapp.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500">
                <Zap className="h-5 w-5 text-navy-950" fill="currentColor" />
              </span>
              <span className="text-base font-bold text-white">
                {businessConfig.businessName}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              {businessConfig.experienceYears}+ years of hands-on electrical
              and home maintenance experience, serving {businessConfig.serviceRegion}.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/areas" className="hover:text-white">Areas We Serve</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/book" className="hover:text-white">Book a Service</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                <a href={`tel:${businessConfig.phone}`} className="hover:text-white">
                  {businessConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-gold-500" />
                <a href={buildWhatsAppLink(businessConfig.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                <a href={`mailto:${businessConfig.email}`} className="hover:text-white">
                  {businessConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-gold-500" />
                <span>{businessConfig.serviceRegion}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {year} {businessConfig.businessName}. All rights reserved.</p>
          <Link to="/admin/login" className="text-white/40 hover:text-white/60">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  )
}