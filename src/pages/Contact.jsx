import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import { useServiceCatalogue } from '../hooks/useServiceCatalogue.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { businessConfig } from '../constants/businessConfig.js'
import { buildWhatsAppLink } from '../utils/whatsapp.js'
import FormField from '../components/common/FormField.jsx'

export default function Contact() {
  useDocumentTitle('Contact')
  const { serviceAreas } = useServiceCatalogue()

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  function handleSendViaWhatsApp() {
    const nextErrors = {}
    if (!name.trim()) nextErrors.name = 'Enter your name.'
    if (!message.trim()) nextErrors.message = 'Enter a message.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const text = `Hello, my name is ${name.trim()}. ${message.trim()}`
    window.open(buildWhatsAppLink(businessConfig.whatsapp, text), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Contact</p>
      <h1 className="mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">Get in Touch</h1>
      <p className="mt-4 text-navy-700">
        Reach us directly by phone or WhatsApp, or send a quick message below.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <a
          href={`tel:${businessConfig.phone}`}
          className="flex flex-col items-center gap-2 rounded-2xl border border-navy-950/10 bg-white p-5 text-center hover:bg-navy-950/[0.02]"
        >
          <Phone className="h-5 w-5 text-gold-600" />
          <span className="text-sm font-semibold text-navy-950">Call</span>
          <span className="text-sm text-navy-700">{businessConfig.phoneDisplay}</span>
        </a>
        <a
          href={buildWhatsAppLink(businessConfig.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 rounded-2xl border border-navy-950/10 bg-white p-5 text-center hover:bg-navy-950/[0.02]"
        >
          <MessageCircle className="h-5 w-5 text-gold-600" />
          <span className="text-sm font-semibold text-navy-950">WhatsApp</span>
          <span className="text-sm text-navy-700">Chat with us</span>
        </a>
        {businessConfig.email && (
          <a
            href={`mailto:${businessConfig.email}`}
            className="flex flex-col items-center gap-2 rounded-2xl border border-navy-950/10 bg-white p-5 text-center hover:bg-navy-950/[0.02]"
          >
            <Mail className="h-5 w-5 text-gold-600" />
            <span className="text-sm font-semibold text-navy-950">Email</span>
            <span className="break-all text-sm text-navy-700">{businessConfig.email}</span>
          </a>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-navy-950/10 bg-surface px-5 py-4 text-sm text-navy-700">
        <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
        Serving selected areas of {businessConfig.serviceRegion}:{' '}
        {serviceAreas.map((area) => area.name).join(', ')}.
      </div>

      <div className="mt-6">
        <Link
          to="/services"
          className="block w-full rounded-full bg-gold-500 py-3 text-center text-sm font-semibold text-navy-950 hover:bg-gold-400 sm:inline-block sm:w-auto sm:px-8"
        >
          Browse Services / Book a Service
        </Link>
      </div>

      <div className="mt-12 rounded-2xl border border-navy-950/10 bg-white p-6">
        <h2 className="text-base font-semibold text-navy-950">Send a Quick Message</h2>
        <p className="mt-1 text-sm text-navy-700">
          This opens WhatsApp with your message pre-filled — nothing is sent until you confirm it there.
        </p>

        <div className="mt-5 space-y-4">
          <FormField label="Name" htmlFor="contactName" required error={errors.name}>
            <input
              id="contactName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contactName-error' : undefined}
              className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
            />
          </FormField>

          <FormField label="Message" htmlFor="contactMessage" required error={errors.message}>
            <textarea
              id="contactMessage"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contactMessage-error' : undefined}
              placeholder="How can we help?"
              className="w-full rounded-xl border border-navy-950/15 px-4 py-3 text-sm text-navy-950 focus:border-gold-500"
            />
          </FormField>

          <button
            type="button"
            onClick={handleSendViaWhatsApp}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-600 sm:w-auto sm:px-8"
          >
            <MessageCircle className="h-4 w-4" />
            Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}