import { generateBookingReference } from './generateReference.js'
import { normalizeIndianPhone } from './validation.js'
import { BOOKING_STATUS } from '../constants/bookingStatus.js'

/**
 * Assembles the final booking object from current booking state.
 * Shaped to mirror the future Supabase `service_requests` +
 * `service_request_items` tables (REQUIREMENTS.md §24) so the Supabase
 * phase's insert logic is a near-direct mapping of this object.
 */
export function buildBookingRequest({ items, location, customerDetails, schedule }) {
  return {
    public_reference: generateBookingReference(),
    user_id: null, // guest booking — no authentication in Phase 1

    customer_name: customerDetails.fullName.trim(),
    phone: normalizeIndianPhone(customerDetails.phone),
    email: customerDetails.email.trim() || null,

    area_id: location.areaId,
    address: location.address.trim(),
    landmark: location.landmark.trim() || null,

    preferred_date: schedule.preferredDate,
    preferred_time: schedule.timeSlotId,

    description: customerDetails.description.trim() || null,

    status: BOOKING_STATUS.PENDING,
    created_at: new Date().toISOString(),

    items: items.map((item) => ({
      service_id: item.serviceId,
      service_option_id: item.serviceOptionId,
      quantity: item.quantity,
      snapshot: item.snapshot,
    })),
  }
}