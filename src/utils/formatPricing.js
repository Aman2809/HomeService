import { PRICING_TYPE, PRICING_TYPE_LABELS } from '../constants/pricingTypes.js'

export function formatCurrencyINR(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`
}

/**
 * Turns a service's pricing_type + starting_price into a display string.
 * Never invents a number — falls back to the generic label whenever a
 * real price hasn't been configured.
 */
export function getPricingLabel(service) {
  if (!service) return ''

  switch (service.pricing_type) {
    case PRICING_TYPE.FIXED:
      return service.starting_price != null
        ? formatCurrencyINR(service.starting_price)
        : PRICING_TYPE_LABELS[PRICING_TYPE.FIXED]

    case PRICING_TYPE.STARTING_FROM:
      return service.starting_price != null
        ? `Starting from ${formatCurrencyINR(service.starting_price)}`
        : PRICING_TYPE_LABELS[PRICING_TYPE.STARTING_FROM]

    case PRICING_TYPE.QUOTE_REQUIRED:
    default:
      return PRICING_TYPE_LABELS[PRICING_TYPE.QUOTE_REQUIRED]
  }
}