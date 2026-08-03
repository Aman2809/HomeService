import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, Zap, UserRound, LayoutDashboard } from 'lucide-react'
import { businessConfig } from '../../constants/businessConfig.js'
import { useAuth } from '../../contexts/AuthContext.jsx'
import MobileMenu from './MobileMenu.jsx'
import BasketBadge from '../booking/BasketBadge.jsx'

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
  // Read-only: isAdmin is populated elsewhere (AdminLogin / 
  // AdminProtectedRoute). This never calls checkAdminStatus() itself,
  // preserving the Step 13 lazy-check design — a logged-in customer
  // browsing the public site never triggers an is_admin() RPC call.
  const { user, isAdmin } = useAuth()

  return (
    <>
      <header className="sticky top-0 z-50 bg-navy-950 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClasses}>
                {link.label}
              </NavLink>
            ))}
            {isAdmin === true && (
              <NavLink to="/admin" className={navLinkClasses}>
                Dashboard
              </NavLink>
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <Link
                to="/account"
                className="flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                <UserRound className="h-4 w-4" />
                My Account
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                Login
              </Link>
            )}
            <Link
              to="/book"
              className="relative rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:bg-gold-400"
            >
              Book a Service
              <BasketBadge className="absolute -right-2 -top-2" />
            </Link>
          </div>

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

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </>
  )
}