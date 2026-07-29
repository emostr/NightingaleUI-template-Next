import { cn } from '@/lib/cn'

export default function NBarChart({ data = [], height = 200 }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="flex items-end gap-2 sm:gap-3" style={{ height: height + 'px' }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
          <div className="text-[11px] font-bold text-muted opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
            {d.value}
          </div>
          <div
            className={cn(
              'w-full bg-surface-3 group-hover:bg-accent transition-[height,background-color] duration-300',
              d.active ? '!bg-accent' : '',
            )}
            style={{ height: Math.max(4, (d.value / max) * (height - 32)) + 'px' }}
          />
          <div className="text-[11px] text-faint truncate w-full text-center">{d.label}</div>
        </div>
      ))}
    </div>
  )
}
