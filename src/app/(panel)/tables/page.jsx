'use client'
import { useState } from 'react'
import NPageHeader from '@/components/ui/NPageHeader'
import NCard from '@/components/ui/NCard'
import NTable from '@/components/ui/NTable'
import NBadge from '@/components/ui/NBadge'
import NButton from '@/components/ui/NButton'
import NCheckbox from '@/components/ui/NCheckbox'
import NProgress from '@/components/ui/NProgress'
import { cn } from '@/lib/cn'

const orderCols = [
  { key: 'id', label: '№', width: '80px' },
  { key: 'customer', label: 'Клиент' },
  { key: 'total', label: 'Сумма', align: 'right' },
  { key: 'status', label: 'Статус' },
  { key: 'date', label: 'Дата', align: 'right' },
]

const orders = [
  { id: '#2314', customer: 'Анна Ковалёва', total: '₽ 12 400', status: 'paid', date: '20.07.2026' },
  { id: '#2313', customer: 'Дмитрий Орлов', total: '₽ 3 250', status: 'processing', date: '20.07.2026' },
  { id: '#2312', customer: 'Мария Зайцева', total: '₽ 8 900', status: 'shipped', date: '19.07.2026' },
  { id: '#2311', customer: 'Игорь Соколов', total: '₽ 1 100', status: 'refunded', date: '19.07.2026' },
  { id: '#2310', customer: 'Ольга Белова', total: '₽ 24 800', status: 'paid', date: '18.07.2026' },
]

const orderStatus = {
  paid: { variant: 'success', label: 'Оплачен' },
  processing: { variant: 'warning', label: 'В обработке' },
  shipped: { variant: 'info', label: 'Отправлен' },
  refunded: { variant: 'danger', label: 'Возврат' },
}

const projectCols = [
  { key: 'check', label: '', width: '48px' },
  { key: 'name', label: 'Проект' },
  { key: 'progress', label: 'Прогресс', width: '200px' },
  { key: 'lead', label: 'Ответственный' },
]

const initialProjects = [
  { id: 1, name: 'Редизайн панели', progress: 82, lead: 'А. Ковалёва', done: false },
  { id: 2, name: 'API v2', progress: 46, lead: 'Д. Орлов', done: false },
  { id: 3, name: 'Мобильное приложение', progress: 100, lead: 'М. Зайцева', done: true },
  { id: 4, name: 'Документация', progress: 23, lead: 'О. Белова', done: false },
]

export default function TablesView() {
  const [projects, setProjects] = useState(initialProjects)

  function setDone(id, value) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, done: value } : p)))
  }

  const orderRender = {
    id: (row) => <span className="font-mono text-muted">{row.id}</span>,
    customer: (row) => <span className="font-semibold text-ink">{row.customer}</span>,
    total: (row) => <span className="font-bold text-ink tabular-nums">{row.total}</span>,
    status: (row) => (
      <NBadge variant={orderStatus[row.status].variant} dot>
        {orderStatus[row.status].label}
      </NBadge>
    ),
    date: (row) => <span className="text-muted text-sm">{row.date}</span>,
  }

  const projectRender = {
    check: (row) => <NCheckbox checked={row.done} onChange={(v) => setDone(row.id, v)} />,
    name: (row) => (
      <span className={cn('font-semibold', row.done ? 'text-faint line-through' : 'text-ink')}>{row.name}</span>
    ),
    progress: (row) => (
      <div className="flex items-center gap-2">
        <NProgress value={row.progress} variant={row.progress === 100 ? 'success' : 'accent'} className="flex-1" />
        <span className="text-xs font-bold text-muted tabular-nums w-9 text-right">{row.progress}%</span>
      </div>
    ),
    lead: (row) => <span className="text-muted text-sm">{row.lead}</span>,
  }

  return (
    <div>
      <NPageHeader
        title="Таблицы"
        subtitle="Варианты представления табличных данных"
        actions={
          <>
            <NButton variant="secondary" icon="filter" size="sm">Фильтры</NButton>
            <NButton variant="secondary" icon="download" size="sm">Экспорт</NButton>
          </>
        }
      />

      <div className="space-y-6">
        <NCard title="Последние заказы" subtitle="Стандартная таблица" padding={false}>
          <NTable columns={orderCols} rows={orders} render={orderRender} />
        </NCard>

        <NCard title="Проекты" subtitle="Таблица с чекбоксами и прогрессом" padding={false}>
          <NTable columns={projectCols} rows={projects} render={projectRender} />
        </NCard>
      </div>
    </div>
  )
}
