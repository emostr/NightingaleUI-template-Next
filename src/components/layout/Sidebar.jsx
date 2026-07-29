'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import NIcon from '../ui/NIcon'
import NAvatar from '../ui/NAvatar'
import NBadge from '../ui/NBadge'

const sections = [
  {
    title: 'Обзор',
    links: [
      { to: '/', label: 'Дашборд', icon: 'dashboard' },
      { to: '/analytics', label: 'Аналитика', icon: 'barChart' },
    ],
  },
  {
    title: 'Управление',
    links: [
      { to: '/users', label: 'Пользователи', icon: 'users', badge: '128' },
      { to: '/tables', label: 'Таблицы', icon: 'table' },
      { to: '/forms', label: 'Формы', icon: 'form' },
    ],
  },
  {
    title: 'Интерфейс',
    links: [
      { to: '/components', label: 'Компоненты', icon: 'grid' },
      { to: '/notifications', label: 'Уведомления', icon: 'bell' },
      { to: '/settings', label: 'Настройки', icon: 'settings' },
    ],
  },
]

export default function Sidebar({ open = false, onClose }) {
  const pathname = usePathname()
  return (
    <aside
      className={cn(
        'fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 bg-bg border-r border-line flex flex-col transition-transform duration-200 lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-line shrink-0">
        <span className="w-8 h-8 bg-accent flex items-center justify-center shrink-0">
          <span className="w-3.5 h-3.5 bg-bg" />
        </span>
        <div className="leading-tight">
          <div className="font-extrabold text-ink tracking-normal">
            Nightingale<span className="text-accent">UI</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((sec) => (
          <div key={sec.title}>
            <div className="ng-label text-faint px-3 mb-1.5">{sec.title}</div>
            {sec.links.map((link) => {
              const active = pathname === link.to
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center gap-3 px-3 py-2.5 text-sm border-l-2 transition-colors',
                    active
                      ? 'text-ink bg-surface-2 border-accent font-semibold'
                      : 'text-muted border-transparent hover:text-ink hover:bg-surface-2',
                  )}
                >
                  <NIcon name={link.icon} size={18} className="shrink-0" />
                  <span className="flex-1">{link.label}</span>
                  {link.badge ? <NBadge variant="accent">{link.badge}</NBadge> : null}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3 shrink-0">
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-3 p-2 hover:bg-surface-2 transition-colors"
        >
          <NAvatar name="Стив Джобс" src="/ProfileIcon.svg" size={38} />
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-sm font-bold text-ink truncate">Стив Джобс</div>
            <div className="text-[11px] text-accent font-semibold uppercase tracking-normal">Администратор</div>
          </div>
          <NIcon name="chevronRight" size={16} className="text-faint" />
        </Link>
      </div>
    </aside>
  )
}
