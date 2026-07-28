import { useBooking } from '../../contexts/BookingContext.jsx'

export default function BasketBadge({ className = '' }) {
  const { itemCount } = useBooking()
  if (itemCount === 0) return null

  return (
    <span
      className={`flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white ${className}`}
    >
      {itemCount > 99 ? '99+' : itemCount}
    </span>
  )
}