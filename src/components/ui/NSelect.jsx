'use client'
import { useId } from 'react'
import NIcon from './NIcon'

export default function NSelect({
  value = '',
  onChange,
  label = '',
  options = [],
  placeholder = 'Выберите…',
  hint = '',
  disabled = false,
}) {
  const uid = useId()
  const normalized = options.map((o) => (typeof o === 'object' ? o : { value: o, label: String(o) }))
  return (
    <div>
      {label ? (
        <label htmlFor={uid} className="ng-label text-muted block mb-1.5">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={uid}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-11 bg-surface-2 text-ink text-sm border border-line focus:border-accent outline-none px-3 pr-9 appearance-none cursor-pointer transition-colors disabled:opacity-50"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {normalized.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <NIcon
          name="chevronDown"
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
      </div>
      {hint ? <p className="text-xs text-faint mt-1.5">{hint}</p> : null}
    </div>
  )
}
