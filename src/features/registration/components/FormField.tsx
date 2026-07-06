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
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-[#181817]">
        {label}
        {required && <b className="text-[#c92c35]"> *</b>}
        {hint && <small className="float-right font-normal text-[#817c75]">{hint}</small>}
      </span>
      {children}
      {error && <span className="text-[11px] text-[#a9272e]">{error}</span>}
    </label>
  )
}
