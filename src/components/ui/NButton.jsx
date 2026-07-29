import { cn } from '@/lib/cn'
import NIcon from './NIcon'

const variants = {
  primary:
    'bg-accent text-on-accent hover:brightness-110 active:brightness-95 border border-transparent',
  secondary:
    'bg-transparent text-ink border border-line-strong hover:border-accent hover:text-accent',
  subtle: 'bg-surface-2 text-ink border border-transparent hover:bg-surface-3',
  ghost:
    'bg-transparent text-muted border border-transparent hover:text-ink hover:bg-surface-2',
  danger:
    'bg-danger text-white border border-transparent hover:brightness-110 active:brightness-95',
}

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
}

const iconSizes = { sm: 15, md: 17, lg: 19 }

export default function NButton({
  variant = 'primary',
  size = 'md',
  icon = '',
  iconRight = '',
  block = false,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  children,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center font-bold tracking-normal select-none',
        'transition-[filter,background-color,border-color,color] duration-150',
        'disabled:opacity-45 disabled:pointer-events-none whitespace-nowrap',
        'ng-tile-press cursor-pointer',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        block ? 'w-full' : '',
        className,
      )}
    >
      {loading ? (
        <NIcon name="refresh" size={iconSizes[size]} className="animate-spin" />
      ) : icon ? (
        <NIcon name={icon} size={iconSizes[size]} />
      ) : null}
      {children != null && children !== false ? <span>{children}</span> : null}
      {iconRight && !loading ? <NIcon name={iconRight} size={iconSizes[size]} /> : null}
    </button>
  )
}
