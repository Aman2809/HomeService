import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import { useBooking } from '../../contexts/BookingContext.jsx'
import { businessConfig } from '../../constants/businessConfig.js'
import { buildWhatsAppLink } from '../../utils/whatsapp.js'
import { TIME_SLOTS } from '../../constants/timeSlots.js'

export default function BookingSuccess() {
    const { submission, submitReset } = useBooking()
    const navigate = useNavigate()
    const result = submission.result

    if (!result) return null

    const timeSlot = TIME_SLOTS.find((slot) => slot.id === result.preferred_time)
    const whatsappMessage = `Hello, I submitted service request ${result.public_reference} and would like to discuss it.`

    function handleLeave(path) {
        submitReset()
        navigate(path)
    }

    return (
        <div className="rounded-2xl border border-navy-950/10 bg-white p-6 text-center sm:p-8">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
            </span>

            <h1 className="mt-4 text-2xl font-bold text-navy-950">Service Request Received</h1>

            <p className="mt-3 text-navy-700">
                We've received your service request. Our team will contact you to confirm the service details and availability.
            </p>

            <div className="mt-5 inline-block rounded-xl bg-navy-950/[0.03] px-5 py-3">
                <p className="text-xs uppercase tracking-wide text-navy-700/70">Request Reference</p>
                <p className="text-lg font-bold text-navy-950">{result.public_reference}</p>
            </div>

            {result.preferred_date && (
                <p className="mt-4 text-sm text-navy-700">
                    Preferred schedule: <strong>{result.preferred_date}</strong>
                    {timeSlot ? `, ${timeSlot.label}` : ''} — not yet confirmed.
                </p>
            )}

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <a
                    href={`tel:${businessConfig.phone}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy-950/15 py-2.5 text-sm font-medium text-navy-900"
                >
                    <Phone className="h-4 w-4" />
                    Call Us
                </a>

                <a
                    href={buildWhatsAppLink(businessConfig.whatsapp, whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-2.5 text-sm font-medium text-white"
                >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                </a>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-navy-950/10 pt-6 sm:flex-row">
                <button
                    type="button"
                    onClick={() => handleLeave('/')}
                    className="flex-1 rounded-full border border-navy-950/15 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
                >
                    Back to Home
                </button>
                <button
                    type="button"
                    onClick={() => handleLeave('/services')}
                    className="flex-1 rounded-full border border-navy-950/15 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
                >
                    Browse Services
                </button>
                <button
                    type="button"
                    onClick={() => handleLeave('/book')}
                    className="flex-1 rounded-full bg-gold-500 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
                >
                    Book Another Service
                </button>
            </div>
        </div>
    )
}