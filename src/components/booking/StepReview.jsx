import { useState } from 'react'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import { getPricingLabel } from '../../utils/formatPricing.js'
import { buildBookingRequest } from '../../utils/buildBookingRequest.js'
import { createServiceRequest } from '../../lib/api/createServiceRequest.js'
import { TIME_SLOTS } from '../../constants/timeSlots.js'

export default function StepReview() {
  const {
    items, location, customerDetails, schedule, setStep,
    submission, submitStart, submitSuccess, submitError,
  } = useBooking()
  const { services, serviceAreas } = useServiceCatalogue()
  const [submitting, setSubmitting] = useState(false)

  const area = serviceAreas.find((a) => a.id === location.areaId)
  const timeSlot = TIME_SLOTS.find((slot) => slot.id === schedule.timeSlotId)

  async function handleSubmit() {
    if (submitting) return
    setSubmitting(true)
    submitStart()

    const payload = buildBookingRequest({ items, location, customerDetails, schedule })
    const { data, error } = await createServiceRequest(payload)

    if (error) {
      submitError('We couldn\u2019t submit your request. Please check your connection and try again.')
      setSubmitting(false)
      return
    }

    submitSuccess(data)
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      {/* ...Services / Location / Customer / Schedule / Notes sections: unchanged... */}

      <p className="text-xs text-navy-700/70">
        This is a request, not a confirmed booking. Our team will contact you to confirm details and availability.
      </p>

      {submission.status === 'error' && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {submission.error}
        </p>
      )}

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