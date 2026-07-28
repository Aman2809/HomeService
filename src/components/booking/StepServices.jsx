import { useState } from 'react'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { validateServicesStep } from '../../utils/validation.js'
import BookingBasket from './BookingBasket.jsx'
import ServiceOptionModal from '../services/ServiceOptionModal.jsx'

export default function StepServices() {
  const { items, setStep } = useBooking()
  const { categories, getServicesByCategory } = useServiceCatalogue()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [manualServiceId, setManualServiceId] = useState(null)

  function handleContinue() {
    const result = validateServicesStep(items)
    if (result.valid) setStep('location')
  }

  return (
    <div>
      <BookingBasket onAddAnother={() => setPickerOpen(true)} />

      {pickerOpen && (
        <div className="mt-6 rounded-2xl border border-navy-950/10 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-navy-950">Choose a service to add</h2>
            <button
              type="button"
              onClick={() => setPickerOpen(false)}
              className="text-sm font-medium text-navy-700 hover:text-navy-950"
            >
              Close
            </button>
          </div>

          <div className="mt-4 space-y-6">
            {categories.map((category) => (
              <div key={category.id}>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-700/70">
                  {category.name}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {getServicesByCategory(category.slug).map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setManualServiceId(service.id)
                        setPickerOpen(false)
                      }}
                      className="rounded-full border border-navy-950/10 bg-navy-950/[0.02] px-3.5 py-2 text-sm font-medium text-navy-800 hover:bg-navy-950/5"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        {items.length === 0 && (
          <p className="mb-3 text-sm text-navy-700">Add at least one service to continue.</p>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            disabled={items.length === 0}
            className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors enabled:hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Location
          </button>
        </div>
      </div>

      <ServiceOptionModal
        open={Boolean(manualServiceId)}
        serviceId={manualServiceId}
        onClose={() => setManualServiceId(null)}
      />
    </div>
  )
}