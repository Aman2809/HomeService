/**
 * Builds a wa.me deep link with an optional prefilled message.
 * Centralized so every WhatsApp button in the app constructs links
 * the same way (requirement #19).
 */
export function buildWhatsAppLink(phone, message = '') {
  const base = `https://wa.me/${phone}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}