export function validateHasItems(items) {
  return items.length > 0 ? null : 'Add at least one service to continue.'
}

export function validateArea(areaId, activeServiceAreas) {
  if (!areaId) return 'Select your service area.'
  const isSupported = activeServiceAreas.some((area) => area.id === areaId)
  return isSupported ? null : "We don't currently serve this area. Please choose a supported area."
}

export function validateAddress(address) {
  if (!address || !address.trim()) return 'Enter your address.'
  if (address.trim().length < 8) return 'Please enter a more complete address.'
  return null
}

export function validateFullName(fullName) {
  if (!fullName || !fullName.trim()) return 'Enter your full name.'
  if (fullName.trim().length < 2) return 'Enter a valid name.'
  return null
}

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/

/**
 * Normalizes common Indian mobile input formats to a plain 10-digit
 * string: '9876543210', '+919876543210', '919876543210', '09876543210'
 * (with or without spaces/hyphens) all normalize to the same value.
 */
export function normalizeIndianPhone(rawPhone) {
  const digitsOnly = (rawPhone || '').replace(/\D/g, '')
  if (digitsOnly.length === 10) return digitsOnly
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) return digitsOnly.slice(1)
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) return digitsOnly.slice(2)
  if (digitsOnly.length === 13 && digitsOnly.startsWith('091')) return digitsOnly.slice(3)
  return digitsOnly
}

export function validatePhone(rawPhone) {
  if (!rawPhone || !rawPhone.trim()) return 'Enter your phone number.'
  const normalized = normalizeIndianPhone(rawPhone)
  return INDIAN_MOBILE_REGEX.test(normalized)
    ? null
    : 'Enter a valid 10-digit Indian mobile number.'
}

export function validateDate(preferredDate) {
  if (!preferredDate) return 'Select a preferred date.'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selected = new Date(`${preferredDate}T00:00:00`)
  return selected < today ? 'Please choose a date that is not in the past.' : null
}

export function validateTimeSlot(timeSlotId, timeSlots) {
  if (!timeSlotId) return 'Select a preferred time.'
  return timeSlots.some((slot) => slot.id === timeSlotId) ? null : 'Select a valid time slot.'
}

export function validateServicesStep(items) {
  const itemsError = validateHasItems(items)
  return { valid: !itemsError, errors: itemsError ? { items: itemsError } : {} }
}

export function validateLocationStep(location, activeServiceAreas) {
  const errors = {}
  const areaError = validateArea(location.areaId, activeServiceAreas)
  const addressError = validateAddress(location.address)
  if (areaError) errors.areaId = areaError
  if (addressError) errors.address = addressError
  return { valid: Object.keys(errors).length === 0, errors }
}

export function validateCustomerStep(customerDetails) {
  const errors = {}
  const nameError = validateFullName(customerDetails.fullName)
  const phoneError = validatePhone(customerDetails.phone)
  if (nameError) errors.fullName = nameError
  if (phoneError) errors.phone = phoneError
  return { valid: Object.keys(errors).length === 0, errors }
}

export function validateScheduleStep(schedule, timeSlots) {
  const errors = {}
  const dateError = validateDate(schedule.preferredDate)
  const slotError = validateTimeSlot(schedule.timeSlotId, timeSlots)
  if (dateError) errors.preferredDate = dateError
  if (slotError) errors.timeSlotId = slotError
  return { valid: Object.keys(errors).length === 0, errors }
}