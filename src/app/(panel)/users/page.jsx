'use client'
import { useMemo, useState } from 'react'
import NPageHeader from '@/components/ui/NPageHeader'
import NCard from '@/components/ui/NCard'
import NButton from '@/components/ui/NButton'
import NBadge from '@/components/ui/NBadge'
import NTable from '@/components/ui/NTable'
import NAvatar from '@/components/ui/NAvatar'
import NInput from '@/components/ui/NInput'
import NSelect from '@/components/ui/NSelect'
import NModal from '@/components/ui/NModal'
import NDropdown from '@/components/ui/NDropdown'
import NDropdownItem from '@/components/ui/NDropdownItem'
import { notify } from '@/lib/notify'

const columns = [
  { key: 'user', label: 'Пользователь' },
  { key: 'role', label: 'Роль' },
  { key: 'status', label: 'Статус' },
  { key: 'joined', label: 'Регистрация' },
  { key: 'actions', label: '', align: 'right', width: '56px' },
]

const initialUsers = [
  { id: 1, name: 'Анна Ковалёва', email: 'anna@example.com', role: 'Администратор', status: 'active', joined: '12.03.2024' },
  { id: 2, name: 'Дмитрий Орлов', email: 'dmitry@example.com', role: 'Редактор', status: 'active', joined: '28.05.2024' },
  { id: 3, name: 'Мария Зайцева', email: 'maria@example.com', role: 'Наблюдатель', status: 'pending', joined: '03.07.2024' },
  { id: 4, name: 'Игорь Соколов', email: 'igor@example.com', role: 'Редактор', status: 'blocked', joined: '19.01.2024' },
  { id: 5, name: 'Ольга Белова', email: 'olga@example.com', role: 'Наблюдатель', status: 'active', joined: '22.06.2024' },
  { id: 6, name: 'Павел Морозов', email: 'pavel@example.com', role: 'Администратор', status: 'active', joined: '08.02.2024' },
]

const statusMap = {
  active: { variant: 'success', label: 'Активен' },
  pending: { variant: 'warning', label: 'Ожидание' },
  blocked: { variant: 'danger', label: 'Заблокирован' },
}

export default function UsersView() {
  const [users, setUsers] = useState(initialUsers)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [modal, setModal] = useState(false)

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          (u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())) &&
          (!roleFilter || u.role === roleFilter),
      ),
    [users, query, roleFilter],
  )

  async function remove(u) {
    const ok = await notify.confirm({
      title: `Удалить ${u.name}?`,
      text: 'Пользователь будет удалён без возможности восстановления.',
      confirmText: 'Удалить',
      danger: true,
    })
    if (ok) {
      setUsers((prev) => prev.filter((x) => x.id !== u.id))
      notify.toast('Пользователь удалён', { icon: 'success' })
    }
  }

  function create() {
    setModal(false)
    notify.success('Пользователь приглашён')
  }

  const render = {
    user: (row) => (
      <div className="flex items-center gap-3">
        <NAvatar name={row.name} size={36} />
        <div>
          <div className="font-semibold text-ink">{row.name}</div>
          <div className="text-xs text-muted">{row.email}</div>
        </div>
      </div>
    ),
    role: (row) => <NBadge variant="neutral">{row.role}</NBadge>,
    status: (row) => (
      <NBadge variant={statusMap[row.status].variant} dot>
        {statusMap[row.status].label}
      </NBadge>
    ),
    joined: (row) => <span className="text-muted text-sm">{row.joined}</span>,
    actions: (row) => (
      <NDropdown align="right">
        <NDropdownItem icon="edit">Редактировать</NDropdownItem>
        <NDropdownItem icon="mail">Написать</NDropdownItem>
        <div className="my-1 border-t border-line" />
        <NDropdownItem icon="trash" danger onClick={() => remove(row)}>
          Удалить
        </NDropdownItem>
      </NDropdown>
    ),
  }

  return (
    <div>
      <NPageHeader
        title="Пользователи"
        subtitle="Управление участниками и правами доступа"
        actions={
          <NButton variant="primary" icon="plus" size="sm" onClick={() => setModal(true)}>
            Добавить
          </NButton>
        }
      />

      <NCard
        padding={false}
        header={
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="w-full sm:max-w-xs">
              <NInput value={query} onChange={setQuery} placeholder="Поиск по имени или почте…" icon="search" />
            </div>
            <div className="w-full sm:w-48">
              <NSelect
                value={roleFilter}
                onChange={setRoleFilter}
                placeholder="Все роли"
                options={['Администратор', 'Редактор', 'Наблюдатель']}
              />
            </div>
          </div>
        }
        footer={
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">
              Показано {filtered.length} из {users.length}
            </span>
            <div className="flex items-center gap-1">
              <NButton variant="ghost" size="sm" icon="chevronLeft" />
              <span className="px-2 text-muted">1 / 1</span>
              <NButton variant="ghost" size="sm" icon="chevronRight" />
            </div>
          </div>
        }
      >
        <NTable columns={columns} rows={filtered} render={render} />
      </NCard>

      <NModal
        open={modal}
        onClose={() => setModal(false)}
        title="Новый пользователь"
        subtitle="Отправьте приглашение по e-mail"
        footer={(close) => (
          <>
            <NButton variant="ghost" onClick={close}>Отмена</NButton>
            <NButton icon="mail" onClick={create}>Пригласить</NButton>
          </>
        )}
      >
        <div className="space-y-4">
          <NInput label="Имя" placeholder="Иван Иванов" icon="user" />
          <NInput label="E-mail" placeholder="mail@example.com" icon="mail" />
          <NSelect label="Роль" options={['Администратор', 'Редактор', 'Наблюдатель']} />
        </div>
      </NModal>
    </div>
  )
}
