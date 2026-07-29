'use client'
import { useTheme } from '@/lib/theme'
import { notify } from '@/lib/notify'
import NIcon from '../ui/NIcon'
import NAvatar from '../ui/NAvatar'
import NDropdown from '../ui/NDropdown'
import NDropdownItem from '../ui/NDropdownItem'

export default function Topbar({ onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme()

  async function logout() {
    const ok = await notify.confirm({
      title: 'Выйти из аккаунта?',
      text: 'Текущая сессия будет завершена.',
      confirmText: 'Выйти',
      danger: true,
    })
    if (ok) notify.toast('Вы вышли из аккаунта', { icon: 'info' })
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-bg/85 backdrop-blur border-b border-line flex items-center gap-3 px-4 sm:px-6">
      <button
        onClick={onToggleSidebar}
        className="lg:hidden h-9 w-9 flex items-center justify-center text-muted hover:text-ink cursor-pointer"
      >
        <NIcon name="menu" size={22} />
      </button>

      <div className="relative hidden sm:block w-full max-w-xs">
        <NIcon
          name="search"
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
        />
        <input
          type="text"
          placeholder="Поиск…"
          className="w-full h-9 bg-surface-2 border border-line focus:border-accent outline-none pl-9 pr-3 text-sm text-ink placeholder:text-faint transition-colors"
        />
      </div>

      <div className="flex-1" />

      <button
        onClick={toggleTheme}
        title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        className="h-9 w-9 flex items-center justify-center text-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
      >
        <NIcon name={theme === 'dark' ? 'sun' : 'moon'} size={19} />
      </button>

      <NDropdown
        align="right"
        width={320}
        trigger={
          <button className="relative h-9 w-9 flex items-center justify-center text-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer">
            <NIcon name="bell" size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent ring-2 ring-bg" />
          </button>
        }
      >
        <div className="px-3.5 py-2 ng-label text-faint border-b border-line">Уведомления</div>
        <div className="max-h-72 overflow-y-auto">
          <div className="px-3.5 py-3 hover:bg-surface-2 border-b border-line/60 cursor-pointer">
            <div className="text-sm text-ink font-semibold">Новый пользователь</div>
            <div className="text-xs text-muted mt-0.5">Анна Ковалёва зарегистрировалась · 5 мин назад</div>
          </div>
          <div className="px-3.5 py-3 hover:bg-surface-2 border-b border-line/60 cursor-pointer">
            <div className="text-sm text-ink font-semibold">Отчёт готов</div>
            <div className="text-xs text-muted mt-0.5">Экспорт за июль завершён · 1 ч назад</div>
          </div>
          <div className="px-3.5 py-3 hover:bg-surface-2 cursor-pointer">
            <div className="text-sm text-ink font-semibold">Обновление системы</div>
            <div className="text-xs text-muted mt-0.5">Версия 1.4.0 установлена · вчера</div>
          </div>
        </div>
      </NDropdown>

      <div className="w-px h-6 bg-line mx-1 hidden sm:block" />

      <NDropdown
        align="right"
        width={240}
        trigger={
          <button className="flex items-center gap-2 pl-1 pr-2 h-9 hover:bg-surface-2 transition-colors cursor-pointer">
            <NAvatar name="Стив Джобс" src="/ProfileIcon.svg" size={30} />
            <NIcon name="chevronDown" size={15} className="text-faint hidden sm:block" />
          </button>
        }
      >
        <div className="px-3.5 py-2.5 border-b border-line">
          <div className="text-sm font-bold text-ink">Стив Джобс</div>
          <div className="text-xs text-muted">stevejobs@example.com</div>
        </div>
        <NDropdownItem icon="user">Профиль</NDropdownItem>
        <NDropdownItem icon="settings">Настройки</NDropdownItem>
        <div className="my-1 border-t border-line" />
        <NDropdownItem icon="logout" danger onClick={logout}>
          Выйти
        </NDropdownItem>
      </NDropdown>
    </header>
  )
}
