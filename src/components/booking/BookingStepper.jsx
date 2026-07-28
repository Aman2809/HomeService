import { Check } from 'lucide-react'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { BOOKING_STEPS } from '../../constants/bookingSteps.js'

export default function BookingStepper() {
  const { currentStep, setStep } = useBooking()
  const currentIndex = BOOKING_STEPS.findIndex((s) => s.id === currentStep)

  return (
    <ol className="flex items-center" aria-label="Booking progress">
      {BOOKING_STEPS.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex

        return (
          <li key={step.id} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              onClick={() => isCompleted && setStep(step.id)}
              disabled={!isCompleted}
              aria-current={isCurrent ? 'step' : undefined}
              className={[
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                isCurrent
                  ? 'bg-gold-500 text-navy-950'
                  : isCompleted
                    ? 'cursor-pointer bg-navy-950 text-white'
                    : 'cursor-default bg-navy-950/10 text-navy-700',
              ].join(' ')}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
            </button>
            <span
              className={[
                'ml-2 hidden text-xs font-medium sm:block',
                isCurrent ? 'text-navy-950' : 'text-navy-700/70',
              ].join(' ')}
            >
              {step.label}
            </span>
            {index < BOOKING_STEPS.length - 1 && (
              <span className="mx-2 h-px flex-1 bg-navy-950/10 sm:mx-3" aria-hidden="true" />
            )}
          </li>
        )
      })}
    </ol>
  )
}