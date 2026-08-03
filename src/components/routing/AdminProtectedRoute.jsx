import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import Unauthorized from '../../pages/Admin/Unauthorized.jsx'

/**
 * Guards admin routes. Mirrors ProtectedRoute's loading/redirect shape,
 * with one addition: after confirming a session exists, it performs
 * the LAZY is_admin() check (via checkAdminStatus()) rather than
 * assuming any authenticated user qualifies.
 *
 * !user               -> redirect to /admin/login (not /login)
 * user, not yet admin-checked -> trigger the check, show loading
 * user, isAdmin=false -> render Unauthorized in place (no redirect loop)
 * user, isAdmin=true  -> render children
 */
export default function AdminProtectedRoute({ children }) {
  const { user, loading, isAdmin, adminLoading, checkAdminStatus } = useAuth()
  const location = useLocation()
  const [checkStarted, setCheckStarted] = useState(false)

  useEffect(() => {
    if (user && isAdmin === null && !checkStarted) {
      setCheckStarted(true)
      checkAdminStatus()
    }
  }, [user, isAdmin, checkStarted, checkAdminStatus])

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-navy-700">Loading…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (isAdmin === null || adminLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-navy-700">Checking permissions…</p>
      </div>
    )
  }

  if (!isAdmin) {
    return <Unauthorized />
  }

  return children
}