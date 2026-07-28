/**
 * Supported pricing models for a service (requirement #14).
 * Only QUOTE_REQUIRED is currently used in seed data because no real
 * prices have been finalized yet — the other two are fully supported
 * by the data shape and UI, ready for real numbers later.
 */
export const PRICING_TYPE = {
  FIXED: 'fixed',
  STARTING_FROM: 'starting_from',
  QUOTE_REQUIRED: 'quote_required',
}

export const PRICING_TYPE_LABELS = {
  [PRICING_TYPE.FIXED]: 'Fixed price',
  [PRICING_TYPE.STARTING_FROM]: 'Starting from',
  [PRICING_TYPE.QUOTE_REQUIRED]: 'Price after inspection',
}