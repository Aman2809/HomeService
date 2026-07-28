import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import QuantitySelector from '../common/QuantitySelector.jsx'
import ServiceOptionModal from '../services/ServiceOptionModal.jsx'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import { getPricingLabel } from '../../utils/formatPricing.js'

export default function BasketItem({ item }) {
  const { updateQuantity, removeItem } = useBooking()
  const { services } = useServiceCatalogue()
  const [editing, setEditing] = useState(false)

  const service = services.find((s) => s.id === item.serviceId)
  const pricingLabel = service ? getPricingLabel(service) : null

  return (
    <>
      <div className="flex flex-col gap-3 rounded-xl border border-navy-950/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-navy-950">{item.snapshot.serviceName}</p>
          {item.snapshot.optionName && (
            <p className="text-sm text-navy-700">{item.snapshot.optionName}</p>
          )}
          {pricingLabel && <p className="mt-1 text-xs text-navy-700/70">{pricingLabel}</p>}
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => updateQuantity(item.itemId, qty)}
          />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy-700 hover:bg-navy-950/5"
              aria-label={`Edit ${item.snapshot.serviceName}`}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => removeItem(item.itemId)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
              aria-label={`Remove ${item.snapshot.serviceName}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ServiceOptionModal
        open={editing}
        serviceId={item.serviceId}
        editingItem={item}
        onClose={() => setEditing(false)}
      />
    </>
  )
}