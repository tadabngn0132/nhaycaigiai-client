import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
}

export function FormField({ label, required, hint, error, children }: FormFieldProps) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
        {required && <b> *</b>}
        {hint && <small>{hint}</small>}
      </span>
      {children}
      {error && <span className="error-message">{error}</span>}
    </label>
  )
}
