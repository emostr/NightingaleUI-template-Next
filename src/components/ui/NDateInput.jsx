'use client'
import { useId, useRef } from 'react'
import NIcon from './NIcon'

export default function NDateInput({
  value = '',
  onChange,
  label = '',
  type = 'date',
  hint = '',
  disabled = false,
}) {
  const uid = useId()
  const field = useRef(null)

  function openPicker() {
    try {
      field.current?.showPicker?.()
    } catch {}
  }

  return (
    <div>
      {label ? (
        <label htmlFor={uid} className="ng-label text-muted block mb-1.5">
          {label}
        </label>
      ) : null}
      <div className="relative group">
        <input
          id={uid}
          ref={field}
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className="ng-date w-full h-11 bg-surface-2 text-ink text-sm border border-line focus:border-accent outline-none pl-3 pr-10 transition-colors disabled:opacity-50 cursor-pointer"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={openPicker}
          className="absolute right-0 top-0 h-11 w-10 flex items-center justify-center text-muted group-focus-within:text-accent hover:text-accent transition-colors cursor-pointer"
        >
          <NIcon name="calendar" size={17} />
        </button>
      </div>
      {hint ? <p className="text-xs text-faint mt-1.5">{hint}</p> : null}
    </div>
  )
}
