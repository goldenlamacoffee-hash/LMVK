'use client'

import type { ReactNode } from 'react'

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
        {label}
      </span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      {children}
    </label>
  )
}

const inputClass =
  'w-full border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold'

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  )
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} resize-y leading-relaxed`}
    />
  )
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3"
    >
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-gold' : 'bg-border'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-card transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </span>
      <span className="text-sm text-foreground">{label}</span>
    </button>
  )
}

export function FieldGroup({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="border border-border bg-secondary/30 p-5">
      <h3 className="font-heading text-xl font-normal text-foreground">{title}</h3>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}
