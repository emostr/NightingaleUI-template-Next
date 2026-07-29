import { cn } from '@/lib/cn'
import NIcon from './NIcon'

export default function NDropdownItem({ icon = '', danger = false, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors cursor-pointer',
        danger ? 'text-danger hover:bg-danger/10' : 'text-ink hover:bg-surface-2',
      )}
    >
      {icon ? <NIcon name={icon} size={16} className={danger ? '' : 'text-muted'} /> : null}
      {children}
    </button>
  )
}
