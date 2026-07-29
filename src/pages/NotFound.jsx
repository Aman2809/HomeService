import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import EmptyState from '../components/common/EmptyState.jsx'

export default function NotFound() {
  useDocumentTitle('Page Not Found')

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <EmptyState
        icon={Compass}
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have moved."
        action={{ label: 'Browse Services', to: '/services' }}
      />
      <div className="mt-4 text-center">
        <Link to="/" className="text-sm font-medium text-navy-700 underline hover:text-navy-950">
          Back to Home
        </Link>
      </div>
    </div>
  )
}