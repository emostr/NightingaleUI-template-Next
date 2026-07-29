import { cn } from '@/lib/cn'

const barColor = {
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

export default function NProgress({
  value = 0,
  max = 100,
  variant = 'accent',
  label = '',
  showValue = false,
  className = '',
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={className}>
      {label || showValue ? (
        <div className="flex items-center justify-between mb-1.5">
          {label ? <span className="text-xs font-semibold text-muted">{label}</span> : null}
          {showValue ? (
            <span className="text-xs font-bold text-ink tabular-nums">{Math.round(pct)}%</span>
          ) : null}
        </div>
      ) : null}
      <div className="h-2 w-full bg-surface-3 overflow-hidden">
        <div
          className={cn('h-full transition-[width] duration-500 ease-out', barColor[variant] || barColor.accent)}
          style={{ width: pct + '%' }}
        />
      </div>
    </div>
  )
}
