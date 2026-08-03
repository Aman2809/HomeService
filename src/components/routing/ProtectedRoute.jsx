import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

/**
 * Guards a route behind an active session.
 *
 * While the initial session check is still in flight (`loading`), we
 * deliberately render nothing rather than redirect — redirecting before
 * we actually know whether a session exists would bounce a logged-in
 * user on every reload before their persisted session has a chance to
 * resolve.
 *
 * On redirect, the attempted location is passed via `state.from` so
 * Login.jsx (already written in Phase 2) can send the user back to
 * where they were headed after a successful login.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-navy-700">Loading…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}