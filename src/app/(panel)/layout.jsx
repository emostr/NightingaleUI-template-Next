'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import ViewTransition from '@/components/layout/ViewTransition'

const TITLES = {
  '/': 'Дашборд',
  '/analytics': 'Аналитика',
  '/users': 'Пользователи',
  '/tables': 'Таблицы',
  '/forms': 'Формы',
  '/components': 'Компоненты',
  '/notifications': 'Уведомления',
  '/settings': 'Настройки',
}

export default function PanelLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const t = TITLES[pathname]
    document.title = t ? `${t} · NightingaleUI` : 'NightingaleUI'
  }, [pathname])

  return (
    <div className="min-h-screen flex bg-bg">
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <ViewTransition>{children}</ViewTransition>
        </main>

        <footer className="border-t border-line px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-faint">NightingaleUI</p>
          <div className="flex items-center gap-4 text-xs text-faint">
            <a href="#" className="hover:text-ink transition-colors">Документация</a>
            <a href="#" className="hover:text-ink transition-colors">Поддержка</a>
            <span>v1.0.1</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
