import { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { X, Phone, MessageCircle, Zap, UserRound } from 'lucide-react'
import { businessConfig } from '../../constants/businessConfig.js'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { buildWhatsAppLink } from '../../utils/whatsapp.js'

export default function MobileMenu({ open, onClose, links }) {
  // Read-only, same as Navbar — never triggers checkAdminStatus().
  const { user, isAdmin } = useAuth()

  useEffect(() => {
    if (!open) return undefined

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-60 lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/60"
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-navy-950/10 px-5 py-4">
          <span className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500">
              <Zap className="h-4 w-4 text-navy-950" fill="currentColor" />
            </span>
            <span className="text-sm font-bold text-navy-950">
              {businessConfig.businessName}
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-navy-950"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Mobile">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-3 text-base font-medium',
                  isActive
                    ? 'bg-gold-500/10 text-gold-600'
                    : 'text-navy-900 hover:bg-navy-950/5',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
          {isAdmin === true && (
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-3 text-base font-medium',
                  isActive
                    ? 'bg-gold-500/10 text-gold-600'
                    : 'text-navy-900 hover:bg-navy-950/5',
                ].join(' ')
              }
            >
              Dashboard
            </NavLink>
          )}
          {user ? (
            <NavLink
              to="/account"
              onClick={onClose}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-navy-900 hover:bg-navy-950/5"
            >
              <UserRound className="h-4 w-4" />
              My Account
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base font-medium text-navy-900 hover:bg-navy-950/5"
            >
              Login
            </NavLink>
          )}
        </nav>

        <div className="space-y-3 border-t border-navy-950/10 px-4 py-4">
          <Link
            to="/book"
            onClick={onClose}
            className="block w-full rounded-full bg-gold-500 py-3 text-center text-sm font-semibold text-navy-950"
          >
            Book a Service
          </Link>

          <div className="flex gap-3">
            <a
              href={`tel:${businessConfig.phone}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-navy-950/15 py-2.5 text-sm font-medium text-navy-900"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>

            <a
              href={buildWhatsAppLink(businessConfig.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 py-2.5 text-sm font-medium text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}