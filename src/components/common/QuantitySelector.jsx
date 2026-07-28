import { Minus, Plus } from 'lucide-react'
import { MIN_ITEM_QUANTITY, MAX_ITEM_QUANTITY } from '../../constants/basketConfig.js'

export default function QuantitySelector({
  value,
  onChange,
  min = MIN_ITEM_QUANTITY,
  max = MAX_ITEM_QUANTITY,
  label = 'Quantity',
}) {
  const decrementDisabled = value <= min
  const incrementDisabled = value >= max

  return (
    <div className="inline-flex items-center gap-3" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={decrementDisabled}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-950/15 text-navy-900 transition-colors hover:bg-navy-950/5 disabled:pointer-events-none disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-6 text-center text-sm font-semibold text-navy-950" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={incrementDisabled}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-950/15 text-navy-900 transition-colors hover:bg-navy-950/5 disabled:pointer-events-none disabled:opacity-40"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}