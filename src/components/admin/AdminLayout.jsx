import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ListChecks, LogOut, Zap } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { businessConfig } from '../../constants/businessConfig.js'

const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'All Requests', to: '/admin/requests', icon: ListChecks, end: false },
]

function navLinkClasses({ isActive }) {
  return [
    'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
    isActive ? 'bg-gold-500/15 text-gold-700' : 'text-navy-700 hover:bg-navy-950/5',
  ].join(' ')
}

/**
 * Shared shell for all /admin/* pages — deliberately a distinct visual
 * language from the customer-facing navy/gold Navbar (per Step 14
 * architecture), signaling "internal tool" rather than public site.
 * Logout lives here (admin's equivalent of Account.jsx's logout),
 * reusing signOut() from AuthContext — no new auth logic.
 */
export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-navy-950/[0.02]">
      <aside className="hidden w-60 flex-shrink-0 flex-col border-r border-navy-950/10 bg-white lg:flex">
        <div className="flex items-center gap-2 border-b border-navy-950/10 px-5 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-950">
            <Zap className="h-4 w-4 text-gold-500" fill="currentColor" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-navy-950">{businessConfig.businessName}</p>
            <p className="text-[11px] text-navy-700/60">Admin</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin">
          {ADMIN_NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClasses}>
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-navy-950/10 px-3 py-4">
          <p className="truncate px-3 text-xs text-navy-700/70">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-950/5"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar — compact equivalent of the sidebar for small screens */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-navy-950/10 bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-950">
              <Zap className="h-3.5 w-3.5 text-gold-500" fill="currentColor" />
            </span>
            <p className="text-sm font-bold text-navy-950">Admin</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium text-navy-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </header>

        <nav
          className="flex gap-1 overflow-x-auto border-b border-navy-950/10 bg-white px-3 py-2 lg:hidden"
          aria-label="Admin"
        >
          {ADMIN_NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClasses}>
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}