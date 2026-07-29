'use client'
import { cn } from '@/lib/cn'
import NIcon from './NIcon'

export default function NTabs({ value, onChange, tabs = [], className = '' }) {
  const normalized = tabs.map((t) => (typeof t === 'object' ? t : { value: t, label: String(t) }))
  return (
    <div className={cn('flex items-stretch gap-1 border-b border-line overflow-x-auto', className)}>
      {normalized.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange?.(t.value)}
          className={cn(
            'relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer',
            value === t.value ? 'text-ink' : 'text-muted hover:text-ink',
          )}
        >
          {t.icon ? <NIcon name={t.icon} size={16} /> : null}
          {t.label}
          {t.badge != null ? (
            <span className="text-[10px] font-bold bg-surface-3 text-muted px-1.5 py-0.5">{t.badge}</span>
          ) : null}
          {value === t.value ? (
            <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-accent" />
          ) : null}
        </button>
      ))}
    </div>
  )
}
