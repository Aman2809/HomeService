/**
 * Preferred-time options shown in the booking flow (Step 4).
 * Kept broad and configurable per requirement #17 — narrower slots
 * can be added later without touching booking UI components.
 */
export const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', description: '9:00 AM – 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', description: '12:00 PM – 4:00 PM' },
  { id: 'evening', label: 'Evening', description: '4:00 PM – 7:00 PM' },
]