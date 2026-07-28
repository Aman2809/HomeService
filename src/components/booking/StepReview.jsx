import { useState } from 'react'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import { getPricingLabel } from '../../utils/formatPricing.js'
import { buildBookingRequest } from '../../utils/buildBookingRequest.js'
import { TIME_SLOTS } from '../../constants/timeSlots.js'

export default function StepReview() {
  const { items, location, customerDetails, schedule, setStep, submitStart, submitSuccess } = useBooking()
  const { services, serviceAreas } = useServiceCatalogue()
  const [submitting, setSubmitting] = useState(false)

  const area = serviceAreas.find((a) => a.id === location.areaId)
  const timeSlot = TIME_SLOTS.find((slot) => slot.id === schedule.timeSlotId)

  async function handleSubmit() {
    if (submitting) return
    setSubmitting(true)
    submitStart()

    // Simulated async boundary only — replaced by a real Supabase
    // insert in a later phase. No artificial failures are introduced.
    await new Promise((resolve) => setTimeout(resolve, 600))

    const bookingRequest = buildBookingRequest({ items, location, customerDetails, schedule })
    console.log('Service request submitted:', bookingRequest)

    submitSuccess(bookingRequest)
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-navy-950/10 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-navy-950">Services</h2>
          <button type="button" onClick={() => setStep('services')} className="text-sm font-medium text-navy-700 hover:text-navy-950">
            Edit
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {items.map((item) => {
            const service = services.find((s) => s.id === item.serviceId)
            return (
              <div key={item.itemId} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-navy-950">{item.snapshot.serviceName}</p>
                  {item.snapshot.optionName && <p className="text-navy-700">{item.snapshot.optionName}</p>}
                  <p className="text-xs text-navy-700/70">{service ? getPricingLabel(service) : ''}</p>
                </div>
                <span className="text-navy-700">Qty: {item.quantity}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-navy-950/10 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-navy-950">Location</h2>
          <button type="button" onClick={() => setStep('location')} className="text-sm font-medium text-navy-700 hover:text-navy-950">
            Edit
          </button>
        </div>
        <div className="mt-3 space-y-1 text-sm text-navy-700">
          <p><span className="font-medium text-navy-950">Area:</span> {area?.name}</p>
          <p><span className="font-medium text-navy-950">Address:</span> {location.address}</p>
          {location.landmark && (
            <p><span className="font-medium text-navy-950">Landmark:</span> {location.landmark}</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-navy-950/10 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-navy-950">Customer</h2>
          <button type="button" onClick={() => setStep('details')} className="text-sm font-medium text-navy-700 hover:text-navy-950">
            Edit
          </button>
        </div>
        <div className="mt-3 space-y-1 text-sm text-navy-700">
          <p><span className="font-medium text-navy-950">Name:</span> {customerDetails.fullName}</p>
          <p><span className="font-medium text-navy-950">Phone:</span> {customerDetails.phone}</p>
          {customerDetails.email && (
            <p><span className="font-medium text-navy-950">Email:</span> {customerDetails.email}</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-navy-950/10 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-navy-950">Schedule</h2>
          <button type="button" onClick={() => setStep('schedule')} className="text-sm font-medium text-navy-700 hover:text-navy-950">
            Edit
          </button>
        </div>
        <div className="mt-3 space-y-1 text-sm text-navy-700">
          <p><span className="font-medium text-navy-950">Date:</span> {schedule.preferredDate}</p>
          <p><span className="font-medium text-navy-950">Time:</span> {timeSlot?.label}</p>
        </div>
      </section>

      {customerDetails.description && (
        <section className="rounded-2xl border border-navy-950/10 bg-white p-5">
          <h2 className="text-sm font-semibold text-navy-950">Notes</h2>
          <p className="mt-2 text-sm text-navy-700">{customerDetails.description}</p>
        </section>
      )}

      <p className="text-xs text-navy-700/70">
        This is a request, not a confirmed booking. Our team will contact you to confirm details and availability.
      </p>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => setStep('schedule')}
          className="rounded-full border border-navy-950/15 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors enabled:hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Place Service Request'}
        </button>
      </div>
    </div>
  )
}