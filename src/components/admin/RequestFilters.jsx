import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const inputClasses =
  'rounded-xl border border-navy-950/15 px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500'

/**
 * Reuses useServiceCatalogue() for the area dropdown — service_areas
 * already comes from Supabase via that hook, no separate admin-only
 * area fetch needed.
 */
export default function RequestFilters({ filters, onChange, onSearchSubmit }) {
  const { serviceAreas } = useServiceCatalogue()

  return (
    <div className="rounded-2xl border border-navy-950/10 bg-white p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSearchSubmit()
        }}
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
      >
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="search" className="block text-xs font-medium text-navy-700">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Name, phone, or reference"
            className={`mt-1 w-full ${inputClasses}`}
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-xs font-medium text-navy-700">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => onChange({ status: e.target.value })}
            className={`mt-1 ${inputClasses}`}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="area" className="block text-xs font-medium text-navy-700">
            Area
          </label>
          <select
            id="area"
            value={filters.areaId}
            onChange={(e) => onChange({ areaId: e.target.value })}
            className={`mt-1 ${inputClasses}`}
          >
            <option value="">All Areas</option>
            {serviceAreas.map((area) => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dateFrom" className="block text-xs font-medium text-navy-700">
            From
          </label>
          <input
            id="dateFrom"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange({ dateFrom: e.target.value })}
            className={`mt-1 ${inputClasses}`}
          />
        </div>

        <div>
          <label htmlFor="dateTo" className="block text-xs font-medium text-navy-700">
            To
          </label>
          <input
            id="dateTo"
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange({ dateTo: e.target.value })}
            className={`mt-1 ${inputClasses}`}
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-navy-950 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-900"
        >
          Search
        </button>
      </form>
    </div>
  )
}