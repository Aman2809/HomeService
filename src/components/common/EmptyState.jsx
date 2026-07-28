import { Link } from 'react-router-dom'
import { Inbox } from 'lucide-react'

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-navy-950/15 bg-navy-950/[0.02] px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-950/5 text-navy-700">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-navy-950">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-navy-700">{description}</p>
      )}
      {action && (
        <Link
          to={action.to}
          className="mt-5 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}