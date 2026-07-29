'use client'
import { useState } from 'react'
import { useTheme, ACCENTS } from '@/lib/theme'
import { cn } from '@/lib/cn'
import NPageHeader from '@/components/ui/NPageHeader'
import NCard from '@/components/ui/NCard'
import NButton from '@/components/ui/NButton'
import NInput from '@/components/ui/NInput'
import NToggle from '@/components/ui/NToggle'
import NTabs from '@/components/ui/NTabs'
import NIcon from '@/components/ui/NIcon'
import NAvatar from '@/components/ui/NAvatar'
import { notify } from '@/lib/notify'

const tabs = [
  { value: 'appearance', label: 'Оформление', icon: 'palette' },
  { value: 'account', label: 'Аккаунт', icon: 'user' },
  { value: 'security', label: 'Безопасность', icon: 'lock' },
]

export default function SettingsView() {
  const { theme, toggleTheme, accent, setAccent } = useTheme()
  const [tab, setTab] = useState('appearance')
  const [prefs, setPrefs] = useState({ animations: true, tooltips: true })
  const [security, setSecurity] = useState({ twoFa: true, sessions: true, alerts: false })

  const setPref = (field) => (value) => setPrefs((prev) => ({ ...prev, [field]: value }))
  const setSec = (field) => (value) => setSecurity((prev) => ({ ...prev, [field]: value }))

  return (
    <div>
      <NPageHeader title="Настройки" subtitle="Персонализация панели и аккаунта" />

      <NTabs value={tab} onChange={setTab} tabs={tabs} className="mb-6" />

      {tab === 'appearance' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NCard title="Тема">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={cn(
                  'border p-4 text-left transition-colors ng-tile-press cursor-pointer',
                  theme === 'dark' ? 'border-accent' : 'border-line hover:border-line-strong',
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <NIcon name="moon" size={20} className="text-accent" />
                  {theme === 'dark' ? <NIcon name="checkCircle" size={18} className="text-accent" /> : null}
                </div>
                <div className="font-bold text-ink text-sm">Тёмная</div>
                <div className="text-xs text-muted">Приоритетная</div>
              </button>
              <button
                onClick={() => theme !== 'light' && toggleTheme()}
                className={cn(
                  'border p-4 text-left transition-colors ng-tile-press cursor-pointer',
                  theme === 'light' ? 'border-accent' : 'border-line hover:border-line-strong',
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <NIcon name="sun" size={20} className="text-accent" />
                  {theme === 'light' ? <NIcon name="checkCircle" size={18} className="text-accent" /> : null}
                </div>
                <div className="font-bold text-ink text-sm">Светлая</div>
                <div className="text-xs text-muted">Дополнительная</div>
              </button>
            </div>
          </NCard>

          <NCard title="Акцентный цвет">
            <div className="grid grid-cols-3 gap-3">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAccent(a.id)}
                  style={{ background: a.hex }}
                  className={cn(
                    'relative h-16 border-2 transition-all ng-tile-press cursor-pointer flex items-end p-2',
                    accent === a.id ? 'border-ink' : 'border-transparent hover:border-line-strong',
                  )}
                >
                  <span className="text-[11px] font-bold text-white mix-blend-difference">{a.label}</span>
                  {accent === a.id ? (
                    <NIcon name="check" size={18} stroke={3} className="absolute top-2 right-2 text-white mix-blend-difference" />
                  ) : null}
                </button>
              ))}
            </div>
          </NCard>

          <NCard title="Интерфейс" className="lg:col-span-2">
            <div className="divide-y divide-line">
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold text-ink text-sm">Анимации</div>
                  <div className="text-xs text-muted">Переходы и эффекты движения</div>
                </div>
                <NToggle checked={prefs.animations} onChange={setPref('animations')} />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold text-ink text-sm">Подсказки</div>
                  <div className="text-xs text-muted">Всплывающие подсказки при наведении</div>
                </div>
                <NToggle checked={prefs.tooltips} onChange={setPref('tooltips')} />
              </div>
            </div>
          </NCard>
        </div>
      ) : tab === 'account' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NCard title="Аватар" className="lg:col-span-1">
            <div className="flex flex-col items-center text-center gap-4 py-2">
              <NAvatar name="Стив Джобс" src="/ProfileIcon.svg" size={88} />
              <div>
                <div className="font-bold text-ink">Стив Джобс</div>
                <div className="text-xs text-muted">Администратор</div>
              </div>
              <NButton variant="secondary" size="sm" icon="download">Загрузить фото</NButton>
            </div>
          </NCard>
          <NCard title="Личные данные" className="lg:col-span-2" accent
            footer={
              <div className="flex justify-end">
                <NButton icon="check" onClick={() => notify.success('Данные обновлены')}>Сохранить</NButton>
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NInput label="Имя" value="Стив" icon="user" />
              <NInput label="Фамилия" value="Джобс" />
              <NInput label="E-mail" value="stevejobs@example.com" icon="mail" />
              <NInput label="Телефон" value="+7 900 000-00-00" />
            </div>
          </NCard>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NCard title="Смена пароля"
            footer={
              <div className="flex justify-end">
                <NButton icon="lock" onClick={() => notify.success('Пароль изменён')}>Обновить пароль</NButton>
              </div>
            }
          >
            <div className="space-y-4">
              <NInput label="Текущий пароль" type="password" placeholder="••••••••" icon="lock" />
              <NInput label="Новый пароль" type="password" placeholder="••••••••" icon="lock" hint="Минимум 8 символов" />
              <NInput label="Повторите пароль" type="password" placeholder="••••••••" icon="lock" />
            </div>
          </NCard>
          <NCard title="Безопасность">
            <div className="divide-y divide-line">
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold text-ink text-sm">Двухфакторная аутентификация</div>
                  <div className="text-xs text-muted">Дополнительная защита входа</div>
                </div>
                <NToggle checked={security.twoFa} onChange={setSec('twoFa')} />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold text-ink text-sm">Активные сессии</div>
                  <div className="text-xs text-muted">Выход при подозрительной активности</div>
                </div>
                <NToggle checked={security.sessions} onChange={setSec('sessions')} />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold text-ink text-sm">Оповещения о входе</div>
                  <div className="text-xs text-muted">Письмо при новом устройстве</div>
                </div>
                <NToggle checked={security.alerts} onChange={setSec('alerts')} />
              </div>
            </div>
          </NCard>
        </div>
      )}
    </div>
  )
}
