'use client'
import { cn } from '@/lib/cn'
import NIcon from './NIcon'

export default function NCheckbox({ checked = false, onChange, label = '', disabled = false }) {
  function toggle(e) {
    e.preventDefault()
    if (!disabled) onChange?.(!checked)
  }
  return (
    <label
      onClick={toggle}
      className={cn(
        'flex w-fit items-center gap-2.5 select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      <span
        className={cn(
          'w-5 h-5 border flex items-center justify-center transition-colors shrink-0',
          checked ? 'bg-accent border-accent text-on-accent' : 'bg-surface-2 border-line-strong',
        )}
      >
        {checked ? <NIcon name="check" size={14} stroke={3} /> : null}
      </span>
      {label ? <span className="text-sm text-ink">{label}</span> : null}
    </label>
  )
}
