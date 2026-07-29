import { cn } from '@/lib/cn'

export default function NCard({
  title = '',
  subtitle = '',
  accent = false,
  padding = true,
  className = '',
  header,
  actions,
  footer,
  children,
}) {
  const showHeader = title || subtitle || header || actions
  return (
    <section
      className={cn('bg-surface border border-line', accent ? 'border-l-[3px] border-l-accent' : '', className)}
    >
      {showHeader ? (
        <header className="flex items-start justify-between gap-4 px-5 py-4 border-b border-line">
          {title || subtitle || header ? (
            <div className="min-w-0">
              {header ?? (
                <>
                  <h3 className="text-[15px] font-bold text-ink truncate">{title}</h3>
                  {subtitle ? <p className="text-xs text-muted mt-0.5">{subtitle}</p> : null}
                </>
              )}
            </div>
          ) : null}
          {actions ? <div className="shrink-0 flex items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className={padding ? 'p-5' : ''}>{children}</div>
      {footer ? (
        <footer className="px-5 py-3 border-t border-line bg-surface-2/40">{footer}</footer>
      ) : null}
    </section>
  )
}
