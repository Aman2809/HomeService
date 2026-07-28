import { useState } from 'react'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { validateCustomerStep } from '../../utils/validation.js'
import FormField from '../common/FormField.jsx'

export default function StepCustomerDetails() {
  const { customerDetails, setCustomerDetails, setStep } = useBooking()
  const [errors, setErrors] = useState({})

  function handleContinue() {
    const result = validateCustomerStep(customerDetails)
    setErrors(result.errors)
    if (result.valid) setStep('schedule')
  }

  return (
    <div className="space-y-5">
      <FormField label="Full Name" htmlFor="fullName" required error={errors.fullName}>
        <input
          id="fullName"
          type="text"
          value={customerDetails.fullName}
          onChange={(e) => setCustomerDetails({ fullName: e.target.value })}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
        />
      </FormField>

      <FormField
        label="Phone Number"
        htmlFor="phone"
        required
        error={errors.phone}
        hint="10-digit Indian mobile number"
      >
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          value={customerDetails.phone}
          onChange={(e) => setCustomerDetails({ phone: e.target.value })}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          placeholder="98765 43210"
          className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
        />
      </FormField>

      <FormField label="Email" htmlFor="email" hint="Optional">
        <input
          id="email"
          type="email"
          value={customerDetails.email}
          onChange={(e) => setCustomerDetails({ email: e.target.value })}
          className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
        />
      </FormField>

      <FormField
        label="Problem Description"
        htmlFor="description"
        hint="Optional — anything that helps us prepare"
      >
        <textarea
          id="description"
          rows={3}
          value={customerDetails.description}
          onChange={(e) => setCustomerDetails({ description: e.target.value })}
          className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
        />
      </FormField>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => setStep('location')}
          className="rounded-full border border-navy-950/15 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          Continue to Schedule
        </button>
      </div>
    </div>
  )
}