import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="divide-y divide-navy-950/10 rounded-2xl border border-navy-950/10 bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `accordion-panel-${item.id}`
        const buttonId = `accordion-button-${item.id}`

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy-950"
              >
                {item.question}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-navy-700 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-4 text-sm leading-relaxed text-navy-700"
              >
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}