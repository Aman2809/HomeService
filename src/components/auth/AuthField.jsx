export default function AuthField({
  id, label, type = 'text', value, onChange, required = false,
  autoComplete, placeholder, minLength,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy-950">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        minLength={minLength}
        className="mt-1.5 w-full rounded-xl border border-navy-950/15 px-4 py-2.5 text-sm text-navy-950 placeholder:text-navy-700/40 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
      />
    </div>
  )
}