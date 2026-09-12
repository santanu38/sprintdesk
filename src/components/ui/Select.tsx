import type { SelectHTMLAttributes } from "react"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  id: string
  options: SelectOption[]
}

function Select({ label, id, options, className = "", ...rest }: SelectProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm text-slate-300 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full bg-slate-700 text-white p-2 rounded outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select