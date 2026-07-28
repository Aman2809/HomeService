/**
 * Identity for a basket line = service + selected option (if any).
 * Same service + same option → same id → quantities merge.
 * Same service + different option → different ids → separate rows.
 */
export function buildBasketItemId(serviceId, serviceOptionId) {
  return `${serviceId}::${serviceOptionId ?? 'none'}`
}