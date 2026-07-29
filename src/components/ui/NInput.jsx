'use client'
import { useId } from 'react'
import { cn } from '@/lib/cn'
import NIcon from './NIcon'

export default function NInput({
  value = '',
  onChange,
  label = '',
  type = 'text',
  placeholder = '',
  hint = '',
  error = '',
  icon = '',
  disabled = false,
  required = false,
  className = '',
}) {
  const uid = useId()
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={uid} className="ng-label text-muted block mb-1.5">
          {label} {required ? <span className="text-accent">*</span> : null}
        </label>
      ) : null}
      <div className="relative">
        {icon ? (
          <NIcon
            name={icon}
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
          />
        ) : null}
        <input
          id={uid}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            'w-full h-11 bg-surface-2 text-ink text-sm border transition-colors',
            'placeholder:text-faint outline-none',
            icon ? 'pl-10 pr-3' : 'px-3',
            error ? 'border-danger focus:border-danger' : 'border-line focus:border-accent',
            disabled ? 'opacity-50 pointer-events-none' : '',
          )}
        />
      </div>
      {error ? (
        <p className="text-xs text-danger mt-1.5">{error}</p>
      ) : hint ? (
        <p className="text-xs text-faint mt-1.5">{hint}</p>
      ) : null}
    </div>
  )
}
