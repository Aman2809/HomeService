export default function FormField({ label, htmlFor, error, required, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-navy-950">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-navy-700/70">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}