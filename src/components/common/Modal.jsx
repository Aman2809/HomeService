import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * Generic modal shell — centered dialog on sm+ screens, bottom sheet on
 * mobile. Rendered via a portal directly into document.body so its
 * `position: fixed` positioning is always relative to the viewport,
 * regardless of transforms (e.g. ServiceCard's hover/focus-within
 * translate) on any ancestor in the calling component's tree.
 *
 * Handles backdrop click, Escape, focus trap, initial focus, focus
 * restoration, and body scroll lock. Contains no service-specific
 * logic — ServiceOptionModal supplies the content.
 */
export default function Modal({ open, onClose, title, children, footer, labelledBy }) {
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    previouslyFocused.current = document.activeElement
    document.body.style.overflow = 'hidden'

    const focusable = panelRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusable?.[0]?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      previouslyFocused.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/60"
      />

      <div
        ref={panelRef}
        className="relative flex max-h-[90dvh] w-full flex-col rounded-t-2xl bg-white shadow-xl sm:max-w-md sm:rounded-2xl"
      >
        <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-navy-950/15 sm:hidden" aria-hidden="true" />

        <div className="flex items-center justify-between border-b border-navy-950/10 px-5 py-4">
          <h2 id={labelledBy} className="text-base font-semibold text-navy-950">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-navy-700 hover:bg-navy-950/5"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {footer && <div className="border-t border-navy-950/10 px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}