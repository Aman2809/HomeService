import { Link } from 'react-router-dom'
import { useServiceCatalogue } from '../../hooks/useServiceCatalogue.js'
import Accordion from '../common/Accordion.jsx'

export default function FaqPreview() {
  const { faqs } = useServiceCatalogue()
  const previewFaqs = faqs.slice(0, 4)

  if (previewFaqs.length === 0) return null

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">Frequently Asked Questions</h2>

        <div className="mt-8">
          <Accordion items={previewFaqs} />
        </div>

        {faqs.length > previewFaqs.length && (
          <p className="mt-4 text-sm text-navy-700">
            Have more questions?{' '}
            <Link to="/contact" className="font-medium text-navy-900 underline hover:text-gold-600">
              Contact us
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  )
}