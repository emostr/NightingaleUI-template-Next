import { cn } from '@/lib/cn'
import NIcon from './NIcon'

const map = {
  info: { border: 'border-l-info', icon: 'info', tint: 'text-info' },
  success: { border: 'border-l-success', icon: 'checkCircle', tint: 'text-success' },
  warning: { border: 'border-l-warning', icon: 'alert', tint: 'text-warning' },
  danger: { border: 'border-l-danger', icon: 'alert', tint: 'text-danger' },
}

export default function NAlert({ variant = 'info', title = '', closable = false, onClose, children }) {
  const conf = map[variant] || map.info
  return (
    <div className={cn('flex items-start gap-3 bg-surface border border-line border-l-[3px] px-4 py-3', conf.border)}>
      <NIcon name={conf.icon} size={20} className={cn(conf.tint, 'shrink-0 mt-0.5')} />
      <div className="min-w-0 flex-1">
        {title ? <p className="font-bold text-ink text-sm">{title}</p> : null}
        <div className={cn('text-sm text-muted', title ? 'mt-0.5' : '')}>{children}</div>
      </div>
      {closable ? (
        <button
          className="shrink-0 text-faint hover:text-danger transition-colors cursor-pointer"
          onClick={onClose}
        >
          <NIcon name="close" size={16} />
        </button>
      ) : null}
    </div>
  )
}
