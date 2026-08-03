export default function StatusSummaryCard({ label, count, accentClass }) {
  return (
    <div className="rounded-2xl border border-navy-950/10 bg-white p-5">
      <p className="text-sm font-medium text-navy-700">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${accentClass ?? 'text-navy-950'}`}>{count}</p>
    </div>
  )
}