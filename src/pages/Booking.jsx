import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useServiceCatalogue } from '../hooks/useServiceCatalogue.js'
import { useBooking } from '../contexts/BookingContext.jsx'
import BookingStepper from '../components/booking/BookingStepper.jsx'
import StepServices from '../components/booking/StepServices.jsx'
import StepLocation from '../components/booking/StepLocation.jsx'
import StepCustomerDetails from '../components/booking/StepCustomerDetails.jsx'
import StepSchedule from '../components/booking/StepSchedule.jsx'
import StepReview from '../components/booking/StepReview.jsx'
import BookingSuccess from '../components/booking/BookingSuccess.jsx'
import ServiceOptionModal from '../components/services/ServiceOptionModal.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Booking() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { getServiceBySlug } = useServiceCatalogue()
  const { currentStep, submission } = useBooking()
  const [autoOpenServiceId, setAutoOpenServiceId] = useState(null)
  useDocumentTitle(submission.status === 'success' ? 'Request Received' : 'Book a Service')

  useEffect(() => {
    const slug = searchParams.get('service')
    if (!slug) return

    const service = getServiceBySlug(slug)
    if (service) setAutoOpenServiceId(service.id)

    searchParams.delete('service')
    setSearchParams(searchParams, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (submission.status === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <BookingSuccess />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="text-2xl font-bold text-navy-950 sm:text-3xl">Book a Service</h1>
      <p className="mt-2 text-navy-700">
        Complete the steps below. Nothing is confirmed until our team contacts you.
      </p>

      <div className="mt-6">
        <BookingStepper />
      </div>

      <div className="mt-8">
        {currentStep === 'services' && <StepServices />}
        {currentStep === 'location' && <StepLocation />}
        {currentStep === 'details' && <StepCustomerDetails />}
        {currentStep === 'schedule' && <StepSchedule />}
        {currentStep === 'review' && <StepReview />}
      </div>

      <ServiceOptionModal
        open={Boolean(autoOpenServiceId)}
        serviceId={autoOpenServiceId}
        onClose={() => setAutoOpenServiceId(null)}
      />
    </div>
  )
}