'use client'
import { cn } from '@/lib/cn'

export default function NRadioGroup({ value = '', onChange, options = [], label = '', inline = false }) {
  const normalized = options.map((o) => (typeof o === 'object' ? o : { value: o, label: String(o) }))
  return (
    <div>
      {label ? <span className="ng-label text-muted block mb-2">{label}</span> : null}
      <div className={inline ? 'flex flex-wrap gap-x-6 gap-y-2' : 'flex flex-col gap-2'}>
        {normalized.map((o) => (
          <label
            key={o.value}
            onClick={(e) => {
              e.preventDefault()
              onChange?.(o.value)
            }}
            className="inline-flex items-center gap-2.5 cursor-pointer select-none"
          >
            <span
              className={cn(
                'w-5 h-5 border flex items-center justify-center transition-colors shrink-0',
                value === o.value ? 'border-accent' : 'border-line-strong',
              )}
            >
              {value === o.value ? <span className="w-2.5 h-2.5 bg-accent" /> : null}
            </span>
            <span className="text-sm text-ink">{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
