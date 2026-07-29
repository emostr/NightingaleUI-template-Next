import { cn } from '@/lib/cn'
import NIcon from './NIcon'

export default function NTile({
  label = '',
  value = '',
  icon = '',
  delta = null,
  trend = '',
  solid = false,
}) {
  const trendUp = trend === 'up'
  const trendClass = solid
    ? 'text-on-accent/85'
    : trendUp
      ? 'text-success'
      : 'text-danger'

  return (
    <div
      className={cn(
        'relative overflow-hidden ng-tile-press border p-5 flex flex-col justify-between min-h-[128px]',
        solid
          ? 'bg-accent text-on-accent border-transparent'
          : 'bg-surface border-line hover:border-line-strong',
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn('ng-label', solid ? 'text-on-accent/80' : 'text-muted')}>{label}</span>
        {icon ? (
          <NIcon name={icon} size={22} className={solid ? 'text-on-accent/70' : 'text-accent'} />
        ) : null}
      </div>

      <div>
        <div className="text-3xl font-extrabold tracking-normal leading-none">{value}</div>
        {delta !== null ? (
          <div className={cn('flex items-center gap-1.5 mt-2 text-xs font-semibold', trendClass)}>
            <NIcon name={trendUp ? 'trendUp' : 'trendDown'} size={14} />
            <span>{delta}</span>
            <span className={cn(solid ? 'text-on-accent/60' : 'text-faint', 'font-normal')}>за 7 дней</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
