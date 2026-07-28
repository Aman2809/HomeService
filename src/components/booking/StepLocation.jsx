import { useState } from 'react'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { validateLocationStep } from '../../utils/validation.js'
import FormField from '../common/FormField.jsx'

export default function StepLocation() {
  const { serviceAreas } = useServiceCatalogue()
  const { location, setLocation, setStep } = useBooking()
  const [errors, setErrors] = useState({})

  function handleContinue() {
    const result = validateLocationStep(location, serviceAreas)
    setErrors(result.errors)
    if (result.valid) setStep('details')
  }

  return (
    <div className="space-y-5">
      <FormField label="Service Area" htmlFor="areaId" required error={errors.areaId}>
        <select
          id="areaId"
          value={location.areaId ?? ''}
          onChange={(e) => setLocation({ areaId: e.target.value || null })}
          aria-invalid={Boolean(errors.areaId)}
          aria-describedby={errors.areaId ? 'areaId-error' : undefined}
          className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
        >
          <option value="">Select your area</option>
          {serviceAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Address" htmlFor="address" required error={errors.address}>
        <textarea
          id="address"
          rows={3}
          value={location.address}
          onChange={(e) => setLocation({ address: e.target.value })}
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? 'address-error' : undefined}
          placeholder="House/flat number, street, area"
          className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
        />
      </FormField>

      <FormField label="Landmark" htmlFor="landmark" hint="Optional — helps our technician find you">
        <input
          id="landmark"
          type="text"
          value={location.landmark}
          onChange={(e) => setLocation({ landmark: e.target.value })}
          className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
        />
      </FormField>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => setStep('services')}
          className="rounded-full border border-navy-950/15 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          Continue to Details
        </button>
      </div>
    </div>
  )
}