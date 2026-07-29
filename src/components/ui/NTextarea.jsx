'use client'
import { useId } from 'react'
import { cn } from '@/lib/cn'

export default function NTextarea({
  value = '',
  onChange,
  label = '',
  placeholder = '',
  hint = '',
  error = '',
  rows = 4,
  disabled = false,
  className = '',
}) {
  const uid = useId()
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={uid} className="ng-label text-muted block mb-1.5">
          {label}
        </label>
      ) : null}
      <textarea
        id={uid}
        value={value}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'w-full bg-surface-2 text-ink text-sm border px-3 py-2.5 resize-y transition-colors',
          'placeholder:text-faint outline-none',
          error ? 'border-danger focus:border-danger' : 'border-line focus:border-accent',
          disabled ? 'opacity-50 pointer-events-none' : '',
        )}
      />
      {error ? (
        <p className="text-xs text-danger mt-1.5">{error}</p>
      ) : hint ? (
        <p className="text-xs text-faint mt-1.5">{hint}</p>
      ) : null}
    </div>
  )
}
