import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext.jsx'

/**
 * Shown to a logged-in user who is authenticated but not an admin.
 * Deliberately NOT a redirect — the person IS signed in, redirecting
 * them to /admin/login would misleadingly imply re-authenticating
 * could help, when the real issue is their account lacks the admin
 * role in user_roles.
 */
export default function Unauthorized() {
  const { signOut } = useAuth()

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center sm:py-24">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
        <ShieldAlert className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-2xl font-bold text-navy-950">Access Denied</h1>
      <p className="mt-3 text-navy-700">
        Your account does not have permission to view this page.
      </p>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          to="/"
          className="rounded-full border border-navy-950/15 px-6 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          Back to Home
        </Link>
        <button
          type="button"
          onClick={() => signOut()}
          className="rounded-full border border-navy-950/15 px-6 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}