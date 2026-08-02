import { normalizeIndianPhone } from './validation.js'

/**
 * Builds the RPC input payload for create_service_request from current
 * booking state.
 *
 * Reference number, status, timestamps, user_id, and item snapshot
 * fields (names + pricing) are ALL determined server-side by the
 * Postgres function — this only assembles what the client is actually
 * allowed to assert: customer-entered details and which
 * service/option/quantity was chosen.
 */
export function buildBookingRequest({ items, location, customerDetails, schedule }) {
  return {
    customer_name: customerDetails.fullName.trim(),
    phone: normalizeIndianPhone(customerDetails.phone),
    email: customerDetails.email.trim() || null,

    area_id: location.areaId,
    address: location.address.trim(),
    landmark: location.landmark.trim() || null,

    preferred_date: schedule.preferredDate,
    preferred_time: schedule.timeSlotId,

    description: customerDetails.description.trim() || null,

    items: items.map((item) => ({
      service_id: item.serviceId,
      service_option_id: item.serviceOptionId,
      quantity: item.quantity,
    })),
  }
}