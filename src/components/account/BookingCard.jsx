import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_STYLES } from '../../constants/bookingStatus.js'
import { getPricingLabel } from '../../utils/formatPricing.js'
import { TIME_SLOTS } from '../../constants/timeSlots.js'

function StatusBadge({ status }) {
  // DB status values are lowercase ('pending', 'in_progress', …);
  // BOOKING_STATUS_LABELS/STYLES keys are uppercase — normalize here
  // rather than duplicating a second status-label map.
  const key = status?.toUpperCase()
  const label = BOOKING_STATUS_LABELS[key] ?? status
  const styles = BOOKING_STATUS_STYLES[key] ?? 'bg-gray-100 text-gray-700'

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {label}
    </span>
  )
}

export default function BookingCard({ booking }) {
  const [expanded, setExpanded] = useState(false)
  const timeSlot = TIME_SLOTS.find((slot) => slot.id === booking.preferred_time)
  const createdDate = new Date(booking.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  return (
    <div className="rounded-2xl border border-navy-950/10 bg-white">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <div>
          <p className="text-sm font-bold text-navy-950">{booking.public_reference}</p>
          <p className="mt-1 text-xs text-navy-700/70">Requested {createdDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={booking.status} />
          <ChevronDown
            className={`h-5 w-5 text-navy-700 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-navy-950/10 p-5 pt-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-700/70">
              Services
            </h3>
            <div className="mt-2 space-y-2">
              {booking.service_request_items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-navy-950">{item.service_name_snapshot}</p>
                    {item.option_name_snapshot && (
                      <p className="text-navy-700">{item.option_name_snapshot}</p>
                    )}
                    <p className="text-xs text-navy-700/70">
                      {getPricingLabel({
                        pricing_type: item.pricing_type_snapshot,
                        starting_price: item.starting_price_snapshot,
                      })}
                    </p>
                  </div>
                  <span className="text-navy-700">Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-700/70">
              Location
            </h3>
            <div className="mt-2 space-y-0.5 text-sm text-navy-700">
              <p>{booking.area_name_snapshot}</p>
              <p>{booking.address}</p>
              {booking.landmark && <p>{booking.landmark}</p>}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-700/70">
              Schedule
            </h3>
            <p className="mt-2 text-sm text-navy-700">
              {booking.preferred_date}{timeSlot ? `, ${timeSlot.label}` : ''}
            </p>
          </div>

          {booking.description && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-700/70">
                Notes
              </h3>
              <p className="mt-2 text-sm text-navy-700">{booking.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}