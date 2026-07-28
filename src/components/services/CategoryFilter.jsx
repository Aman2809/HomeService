import { getCategoryIcon } from '../../constants/serviceIcons.js'

export default function CategoryFilter({ categories, activeSlug, onChange }) {
  const items = [{ slug: 'all', name: 'All Services' }, ...categories]

  return (
    <>
      {/* Mobile: horizontal scrollable pills */}
      <div
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden"
        role="tablist"
        aria-label="Filter services by category"
      >
        {items.map((item) => {
          const isActive = item.slug === activeSlug
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(item.slug)}
              className={[
                'shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-navy-950 text-white' : 'bg-navy-950/5 text-navy-800 hover:bg-navy-950/10',
              ].join(' ')}
            >
              {item.name}
            </button>
          )
        })}
      </div>

      {/* Desktop: vertical sidebar */}
      <nav
        className="hidden w-56 shrink-0 rounded-2xl border border-navy-950/10 bg-white p-3 lg:block"
        aria-label="Filter services by category"
      >
        <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-navy-700/70">
          Categories
        </p>
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = item.slug === activeSlug
            const Icon = item.slug === 'all' ? null : getCategoryIcon(item)
            return (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => onChange(item.slug)}
                  aria-current={isActive ? 'true' : undefined}
                  className={[
                    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
                    isActive ? 'bg-gold-500/15 text-gold-700' : 'text-navy-800 hover:bg-navy-950/5',
                  ].join(' ')}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  {item.name}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}