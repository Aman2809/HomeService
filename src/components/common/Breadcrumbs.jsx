import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-navy-700/40" />}
            {isLast || !item.to ? (
              <span aria-current={isLast ? 'page' : undefined} className="font-medium text-navy-900">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="text-navy-700 hover:text-navy-950">
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}