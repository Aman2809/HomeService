import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useServiceCatalogue } from '../hooks/useServiceCatalogue.js'
import BookingBasket from '../components/booking/BookingBasket.jsx'
import ServiceOptionModal from '../components/services/ServiceOptionModal.jsx'

export default function Booking() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { getServiceBySlug, categories, getServicesByCategory } = useServiceCatalogue()

  const [autoOpenServiceId, setAutoOpenServiceId] = useState(null)
  const [manualServiceId, setManualServiceId] = useState(null)
  const [pickerOpen, setPickerOpen] = useState(false)

  useEffect(() => {
    const slug = searchParams.get('service')
    if (!slug) return

    // Invalid/inactive slug: silently ignored — the page still renders
    // normally, nothing crashes or shows an error.
    const service = getServiceBySlug(slug)
    if (service) {
      setAutoOpenServiceId(service.id)
    }

    searchParams.delete('service')
    setSearchParams(searchParams, { replace: true })
    // Run once on mount only — this reads the initial URL, not live state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="text-2xl font-bold text-navy-950 sm:text-3xl">Book a Service</h1>
      <p className="mt-2 text-navy-700">
        Add one or more services below. Location, contact details, and scheduling come next.
      </p>

      <div className="mt-8">
        <BookingBasket onAddAnother={() => setPickerOpen(true)} />
      </div>

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

      <ServiceOptionModal
        open={Boolean(autoOpenServiceId)}
        serviceId={autoOpenServiceId}
        onClose={() => setAutoOpenServiceId(null)}
      />
      <ServiceOptionModal
        open={Boolean(manualServiceId)}
        serviceId={manualServiceId}
        onClose={() => setManualServiceId(null)}
      />
    </div>
  )
}