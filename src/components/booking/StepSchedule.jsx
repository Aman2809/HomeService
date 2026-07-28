import { useState } from 'react'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { TIME_SLOTS } from '../../constants/timeSlots.js'
import { validateScheduleStep } from '../../utils/validation.js'
import FormField from '../common/FormField.jsx'

function getTodayIsoDate() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export default function StepSchedule() {
  const { schedule, setSchedule, setStep } = useBooking()
  const [errors, setErrors] = useState({})
  const todayIso = getTodayIsoDate()

  function handleContinue() {
    const result = validateScheduleStep(schedule, TIME_SLOTS)
    setErrors(result.errors)
    if (result.valid) setStep('review')
  }

  return (
    <div className="space-y-5">
      <p className="rounded-xl bg-navy-950/[0.03] px-4 py-3 text-sm text-navy-700">
        This is your <strong>preferred</strong> schedule. Our team will contact you to confirm availability.
      </p>

      <FormField label="Preferred Date" htmlFor="preferredDate" required error={errors.preferredDate}>
        <input
          id="preferredDate"
          type="date"
          min={todayIso}
          value={schedule.preferredDate}
          onChange={(e) => setSchedule({ preferredDate: e.target.value })}
          aria-invalid={Boolean(errors.preferredDate)}
          aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
          className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
        />
      </FormField>

      <fieldset>
        <legend className="text-sm font-medium text-navy-950">
          Preferred Time <span className="text-red-600">*</span>
        </legend>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {TIME_SLOTS.map((slot) => {
            const isSelected = schedule.timeSlotId === slot.id
            return (
              <label
                key={slot.id}
                className={[
                  'flex cursor-pointer flex-col rounded-xl border px-4 py-3 text-sm transition-colors',
                  isSelected ? 'border-gold-500 bg-gold-500/10' : 'border-navy-950/10 hover:bg-navy-950/[0.03]',
                ].join(' ')}
              >
                <span className="flex items-center justify-between font-medium text-navy-950">
                  {slot.label}
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot.id}
                    checked={isSelected}
                    onChange={() => setSchedule({ timeSlotId: slot.id })}
                    className="h-4 w-4 accent-gold-500"
                  />
                </span>
                <span className="mt-0.5 text-xs text-navy-700">{slot.description}</span>
              </label>
            )
          })}
        </div>
        {errors.timeSlotId && (
          <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
            {errors.timeSlotId}
          </p>
        )}
      </fieldset>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => setStep('details')}
          className="rounded-full border border-navy-950/15 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          Review Request
        </button>
      </div>
    </div>
  )
}