'use client'
import Link from 'next/link'
import NPageHeader from '@/components/ui/NPageHeader'
import NTile from '@/components/ui/NTile'
import NCard from '@/components/ui/NCard'
import NButton from '@/components/ui/NButton'
import NBadge from '@/components/ui/NBadge'
import NBarChart from '@/components/ui/NBarChart'
import NProgress from '@/components/ui/NProgress'
import NAvatar from '@/components/ui/NAvatar'
import NIcon from '@/components/ui/NIcon'
import { notify } from '@/lib/notify'
import { cn } from '@/lib/cn'

const stats = [
  { label: 'Выручка', value: '₽ 4.82M', icon: 'card', delta: '+12.4%', trend: 'up', solid: true },
  { label: 'Пользователи', value: '12 480', icon: 'users', delta: '+3.1%', trend: 'up' },
  { label: 'Заказы', value: '2 314', icon: 'box', delta: '+8.7%', trend: 'up' },
  { label: 'Возвраты', value: '48', icon: 'refresh', delta: '-1.9%', trend: 'down' },
]

const chart = [
  { label: 'Пн', value: 42 },
  { label: 'Вт', value: 58 },
  { label: 'Ср', value: 36 },
  { label: 'Чт', value: 71 },
  { label: 'Пт', value: 89, active: true },
  { label: 'Сб', value: 64 },
  { label: 'Вс', value: 51 },
]

const channels = [
  { label: 'Прямые', value: 68, variant: 'accent' },
  { label: 'Поиск', value: 52, variant: 'success' },
  { label: 'Соцсети', value: 37, variant: 'warning' },
  { label: 'Реклама', value: 21, variant: 'danger' },
]

const activity = [
  { name: 'Анна Ковалёва', action: 'создала заказ #2314', time: '5 мин', color: 'success' },
  { name: 'Дмитрий Орлов', action: 'обновил профиль', time: '18 мин', color: 'accent' },
  { name: 'Мария Зайцева', action: 'оставила отзыв', time: '42 мин', color: 'warning' },
  { name: 'Игорь Соколов', action: 'отменил подписку', time: '1 ч', color: 'danger' },
  { name: 'Ольга Белова', action: 'зарегистрировалась', time: '2 ч', color: 'accent' },
]

const dotColor = { success: 'bg-success', accent: 'bg-accent', warning: 'bg-warning', danger: 'bg-danger' }

export default function DashboardView() {
  return (
    <div>
      <NPageHeader
        title="Дашборд"
        subtitle="Сводка за последние 7 дней"
        actions={
          <>
            <NButton variant="secondary" icon="download" size="sm">Экспорт</NButton>
            <NButton variant="primary" icon="plus" size="sm" onClick={() => notify.success('Виджет добавлен')}>
              Виджет
            </NButton>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <NTile key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <NCard
          className="xl:col-span-2"
          title="Активность за неделю"
          subtitle="Количество событий по дням"
          actions={<NBadge variant="success" dot>+18%</NBadge>}
        >
          <NBarChart data={chart} height={240} />
        </NCard>

        <NCard
          title="Источники трафика"
          footer={
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Конверсия</span>
              <span className="font-bold text-ink">4.62%</span>
            </div>
          }
        >
          <div className="space-y-4">
            {channels.map((c) => (
              <NProgress key={c.label} value={c.value} variant={c.variant} label={c.label} showValue />
            ))}
          </div>
        </NCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <NCard
          className="xl:col-span-2"
          title="Последняя активность"
          subtitle="Действия пользователей в реальном времени"
          padding={false}
          footer={
            <Link
              href="/users"
              className="text-sm text-accent font-semibold hover:underline inline-flex items-center gap-1"
            >
              Все пользователи <NIcon name="arrowRight" size={15} />
            </Link>
          }
        >
          <div className="divide-y divide-line">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-surface-2 transition-colors">
                <NAvatar name={a.name} size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink truncate">
                    <span className="font-semibold">{a.name}</span> {a.action}
                  </p>
                </div>
                <span className={cn('w-2 h-2 shrink-0', dotColor[a.color])} />
                <span className="text-xs text-faint whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </NCard>

        <div className="space-y-4">
          <NTile label="Нагрузка сервера" value="63%" icon="activity" delta={null} solid />
          <NCard title="Хранилище">
            <div className="space-y-3">
              <NProgress value={72} variant="accent" label="Диск" showValue />
              <NProgress value={45} variant="warning" label="База данных" showValue />
              <NProgress value={88} variant="danger" label="Резервные копии" showValue />
            </div>
          </NCard>
        </div>
      </div>
    </div>
  )
}
