'use client'
import { cn } from '@/lib/cn'

export default function NToggle({ checked = false, onChange, label = '', disabled = false }) {
  function toggle(e) {
    e.preventDefault()
    if (!disabled) onChange?.(!checked)
  }
  return (
    <label
      onClick={toggle}
      className={cn(
        'flex w-fit items-center gap-3 select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      <span
        className={cn(
          'relative inline-flex items-center w-12 h-6 px-1 border transition-colors duration-150 shrink-0',
          checked ? 'bg-accent border-accent' : 'bg-surface-2 border-line-strong',
        )}
      >
        <span
          className={cn(
            'w-4 h-4 transition-transform duration-200 ease-out',
            checked ? 'translate-x-6 bg-on-accent' : 'translate-x-0 bg-muted',
          )}
        />
      </span>
      {label ? <span className="text-sm text-ink">{label}</span> : null}
    </label>
  )
}
