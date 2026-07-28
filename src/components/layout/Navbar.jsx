import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, Zap } from 'lucide-react'
import { businessConfig } from '../../constants/businessConfig.js'
import MobileMenu from './MobileMenu.jsx'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Service Areas', to: '/areas' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function navLinkClasses({ isActive }) {
  return [
    'text-sm font-medium transition-colors',
    isActive ? 'text-gold-500' : 'text-white/85 hover:text-white',
  ].join(' ')
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-navy-950 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500">
              <Zap className="h-5 w-5 text-navy-950" fill="currentColor" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold text-white">
                {businessConfig.businessName}
              </span>
              <span className="text-[11px] text-white/60">
                {businessConfig.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClasses}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop right-side actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/book"
              className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:bg-gold-400"
            >
              Book a Service
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  )
}