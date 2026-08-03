import { Link } from 'react-router-dom'
import AdminStatusBadge from './AdminStatusBadge.jsx'
import { formatShortDate } from '../../utils/formatDate.js'

export default function RequestRow({ request }) {
  const itemCount = request.service_request_items?.length ?? 0

  return (
    <Link
      to={`/admin/requests/${request.id}`}
      className="grid grid-cols-1 gap-2 rounded-2xl border border-navy-950/10 bg-white p-4 transition-colors hover:border-gold-500/40 hover:bg-gold-500/[0.03] sm:grid-cols-[1fr_1fr_auto_auto_auto] sm:items-center sm:gap-4 sm:p-5"
    >
      <div>
        <p className="text-sm font-bold text-navy-950">{request.public_reference}</p>
        <p className="text-xs text-navy-700/70">{formatShortDate(request.created_at)}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-navy-950">{request.customer_name}</p>
        <p className="text-xs text-navy-700/70">{request.phone}</p>
      </div>

      <p className="text-sm text-navy-700">{request.area_name_snapshot}</p>

      <p className="text-sm text-navy-700">
        {itemCount} service{itemCount === 1 ? '' : 's'}
      </p>

      <AdminStatusBadge status={request.status} />
    </Link>
  )
}