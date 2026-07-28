import { useState, useEffect } from 'react'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { getPricingLabel } from '../../utils/formatPricing.js'
import Modal from '../common/Modal.jsx'
import QuantitySelector from '../common/QuantitySelector.jsx'

/**
 * Fully data-driven: reads the service's options (if any) from the
 * catalogue hook and branches on `options.length`, never on a specific
 * service id/slug. Used both to add a new basket item and, via
 * `editingItem`, to edit an existing one.
 */
export default function ServiceOptionModal({ open, serviceId, editingItem = null, onClose }) {
  const { services, getOptionsForService } = useServiceCatalogue()
  const { addItem, updateItemConfig } = useBooking()

  const service = services.find((s) => s.id === serviceId) ?? null
  const options = service ? getOptionsForService(service.id) : []
  const isEditing = Boolean(editingItem)
  const hasOptions = options.length > 0

  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!open) return
    if (editingItem) {
      setSelectedOptionId(editingItem.serviceOptionId)
      setQuantity(editingItem.quantity)
    } else {
      setSelectedOptionId(options[0]?.id ?? null)
      setQuantity(1)
    }
    // Reset only when the modal opens for a (possibly new) service/item —
    // not on every re-render of the (non-memoized) options array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, serviceId, editingItem])

  if (!open || !service) return null

  const canSubmit = !hasOptions || Boolean(selectedOptionId)

  function handleSubmit() {
    if (!canSubmit) return

    const selectedOption = options.find((o) => o.id === selectedOptionId) ?? null
    const snapshot = {
      serviceName: service.name,
      serviceSlug: service.slug,
      optionName: selectedOption?.name ?? null,
      pricingType: service.pricing_type,
      startingPrice: service.starting_price,
    }

    if (isEditing) {
      updateItemConfig({
        itemId: editingItem.itemId,
        serviceOptionId: hasOptions ? selectedOptionId : null,
        quantity,
        snapshot,
      })
    } else {
      addItem({
        serviceId: service.id,
        serviceOptionId: hasOptions ? selectedOptionId : null,
        quantity,
        snapshot,
      })
    }

    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={service.name}
      labelledBy="service-option-modal-title"
      footer={
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full rounded-full bg-gold-500 py-3 text-sm font-semibold text-navy-950 transition-colors enabled:hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isEditing ? 'Update Service' : 'Add Service'}
        </button>
      }
    >
      <p className="text-sm font-medium text-navy-700">{getPricingLabel(service)}</p>

      {hasOptions && (
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-navy-950">Select an option</legend>
          <div className="mt-2 space-y-2">
            {options.map((option) => {
              const isSelected = option.id === selectedOptionId
              return (
                <label
                  key={option.id}
                  className={[
                    'flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors',
                    isSelected
                      ? 'border-gold-500 bg-gold-500/10 text-navy-950'
                      : 'border-navy-950/10 text-navy-800 hover:bg-navy-950/[0.03]',
                  ].join(' ')}
                >
                  {option.name}
                  <input
                    type="radio"
                    name="service-option"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedOptionId(option.id)}
                    className="h-4 w-4 accent-gold-500"
                  />
                </label>
              )
            })}
          </div>
        </fieldset>
      )}

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-navy-950">Quantity</span>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>
    </Modal>
  )
}