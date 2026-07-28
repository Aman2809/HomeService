// Technical safeguard against accidental huge values in the quantity
// input — NOT a business limit. Both residential and commercial jobs
// are supported, so this is intentionally generous.
export const MIN_ITEM_QUANTITY = 1
export const MAX_ITEM_QUANTITY = 99

// Only basket `items` are persisted — never location, customer details,
// phone, address, or schedule (those hold personal data and belong to
// Supabase once actually submitted, not to client storage).
export const BASKET_STORAGE_KEY = 'powerfix_booking_basket_v1'
export const BASKET_STORAGE_VERSION = 1