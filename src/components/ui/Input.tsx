import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  id: string
}

function Input({ label, error, id, className = "", ...rest }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm text-slate-300 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-slate-700 text-white p-2 rounded outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "ring-2 ring-red-500" : ""
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input