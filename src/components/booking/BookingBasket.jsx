import { ShoppingBag } from 'lucide-react'
import { useBooking } from '../../contexts/BookingContext.jsx'
import BasketItem from './BasketItem.jsx'
import EmptyState from '../common/EmptyState.jsx'

export default function BookingBasket({ onAddAnother }) {
  const { items, clearBasket } = useBooking()

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your service list is empty"
        description="Browse our services and add one to get started."
        action={{ label: 'Browse Services', to: '/services' }}
      />
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-navy-950">Your Services</h2>
        <button
          type="button"
          onClick={clearBasket}
          className="text-sm font-medium text-navy-700 hover:text-red-600"
        >
          Clear all
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <BasketItem key={item.itemId} item={item} />
        ))}
      </div>

      <button
        type="button"
        onClick={onAddAnother}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-navy-950/20 py-3 text-sm font-medium text-navy-700 hover:bg-navy-950/[0.03]"
      >
        + Add another service
      </button>
    </div>
  )
}