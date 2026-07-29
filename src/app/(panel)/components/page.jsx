'use client'
import { useState } from 'react'
import NPageHeader from '@/components/ui/NPageHeader'
import NCard from '@/components/ui/NCard'
import NButton from '@/components/ui/NButton'
import NBadge from '@/components/ui/NBadge'
import NAlert from '@/components/ui/NAlert'
import NProgress from '@/components/ui/NProgress'
import NTabs from '@/components/ui/NTabs'
import NToggle from '@/components/ui/NToggle'
import NCheckbox from '@/components/ui/NCheckbox'
import NRadioGroup from '@/components/ui/NRadioGroup'
import NInput from '@/components/ui/NInput'
import NSelect from '@/components/ui/NSelect'
import NDateInput from '@/components/ui/NDateInput'
import NModal from '@/components/ui/NModal'
import NAvatar from '@/components/ui/NAvatar'
import NDropdown from '@/components/ui/NDropdown'
import NDropdownItem from '@/components/ui/NDropdownItem'
import { notify } from '@/lib/notify'

const tabs = [
  { value: 'buttons', label: 'Кнопки', icon: 'grid' },
  { value: 'inputs', label: 'Поля', icon: 'form' },
  { value: 'feedback', label: 'Обратная связь', icon: 'bell' },
  { value: 'data', label: 'Данные', icon: 'barChart' },
]

export default function ComponentsView() {
  const [tab, setTab] = useState('buttons')
  const [toggle1, setToggle1] = useState(true)
  const [toggle2, setToggle2] = useState(false)
  const [check1, setCheck1] = useState(true)
  const [check2, setCheck2] = useState(false)
  const [radio, setRadio] = useState('daily')
  const [text, setText] = useState('')
  const [sel, setSel] = useState('')
  const [date, setDate] = useState('')
  const [modal, setModal] = useState(false)

  return (
    <div>
      <NPageHeader title="Компоненты" subtitle="Библиотека элементов интерфейса NightingaleUI" />

      <NTabs value={tab} onChange={setTab} tabs={tabs} className="mb-6" />

      {tab === 'buttons' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NCard title="Варианты">
            <div className="flex flex-wrap gap-2.5">
              <NButton variant="primary">Основная</NButton>
              <NButton variant="secondary">Вторичная</NButton>
              <NButton variant="subtle">Мягкая</NButton>
              <NButton variant="ghost">Призрак</NButton>
              <NButton variant="danger">Удалить</NButton>
            </div>
          </NCard>

          <NCard title="Размеры и состояния">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <NButton size="sm">Small</NButton>
              <NButton size="md">Medium</NButton>
              <NButton size="lg">Large</NButton>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <NButton icon="plus">С иконкой</NButton>
              <NButton iconRight="arrowRight" variant="secondary">Далее</NButton>
              <NButton loading>Загрузка</NButton>
              <NButton disabled>Выключена</NButton>
            </div>
          </NCard>

          <NCard title="Значки (Badges)">
            <div className="flex flex-wrap gap-2">
              <NBadge>Neutral</NBadge>
              <NBadge variant="accent">Accent</NBadge>
              <NBadge variant="success" dot>Активен</NBadge>
              <NBadge variant="warning" dot>Ожидание</NBadge>
              <NBadge variant="danger" dot>Ошибка</NBadge>
              <NBadge variant="info">Инфо</NBadge>
            </div>
          </NCard>

          <NCard title="Аватары и меню">
            <div className="flex items-center gap-4">
              <NAvatar name="Стив Джобс" size={48} />
              <NAvatar name="Анна Ковалёва" size={48} />
              <NAvatar name="Дмитрий Орлов" size={48} square={false} />
              <NDropdown
                align="left"
                trigger={<NButton variant="secondary" iconRight="chevronDown">Действия</NButton>}
              >
                <NDropdownItem icon="edit">Редактировать</NDropdownItem>
                <NDropdownItem icon="download">Экспорт</NDropdownItem>
                <div className="my-1 border-t border-line" />
                <NDropdownItem icon="trash" danger>Удалить</NDropdownItem>
              </NDropdown>
            </div>
          </NCard>
        </div>
      ) : tab === 'inputs' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NCard title="Текстовые поля">
            <div className="space-y-4">
              <NInput value={text} onChange={setText} label="Имя" placeholder="Введите имя" icon="user" />
              <NInput label="E-mail" placeholder="mail@example.com" icon="mail" hint="Мы продаем Ваш email нашим прекрасным рекламодателям" />
              <NInput label="Пароль" type="password" placeholder="••••••••" icon="lock" error="Слишком короткий пароль" />
              <NSelect value={sel} onChange={setSel} label="Роль" options={['Администратор', 'Редактор', 'Наблюдатель']} />
              <NDateInput value={date} onChange={setDate} label="Дата" hint="Я календарь переверну" />
            </div>
          </NCard>

          <NCard title="Переключатели и флажки">
            <div className="space-y-5">
              <div className="space-y-3">
                <NToggle checked={toggle1} onChange={setToggle1} label="Push-уведомления" />
                <NToggle checked={toggle2} onChange={setToggle2} label="Двухфакторная аутентификация" />
                <NToggle checked={false} label="Отключено" disabled />
              </div>
              <div className="border-t border-line pt-4 space-y-3">
                <NCheckbox checked={check1} onChange={setCheck1} label="Принять условия" />
                <NCheckbox checked={check2} onChange={setCheck2} label="Подписаться на рассылку и продать свои данные" />
              </div>
              <div className="border-t border-line pt-4">
                <NRadioGroup
                  value={radio}
                  onChange={setRadio}
                  label="Частота отчётов"
                  options={[
                    { value: 'daily', label: 'Ежедневно' },
                    { value: 'weekly', label: 'Еженедельно' },
                    { value: 'monthly', label: 'Ежемесячно' },
                  ]}
                />
              </div>
            </div>
          </NCard>
        </div>
      ) : tab === 'feedback' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NCard title="Уведомления (inline)">
            <div className="space-y-3">
              <NAlert variant="info" title="Информация">Новая версия панели уже доступна.</NAlert>
              <NAlert variant="success" title="Успех">Изменения сохранены.</NAlert>
              <NAlert variant="warning" title="Внимание" closable>Срок действия ключа истекает через 3 дня.</NAlert>
              <NAlert variant="danger" title="Ошибка">Не удалось подключиться к серверу.</NAlert>
            </div>
          </NCard>

          <NCard title="Всплывающие окна">
            <p className="text-sm text-muted mb-4">На базе sweetalert2-neutral</p>
            <div className="flex flex-wrap gap-2.5">
              <NButton size="sm" onClick={() => notify.success('Готово!')}>Success</NButton>
              <NButton size="sm" variant="danger" onClick={() => notify.error('Что-то пошло не так')}>Error</NButton>
              <NButton size="sm" variant="secondary" onClick={() => notify.warning('Проверьте данные')}>Warning</NButton>
              <NButton size="sm" variant="subtle" onClick={() => notify.toast('Сохранено в черновики', { icon: 'info' })}>Toast</NButton>
              <NButton size="sm" variant="secondary" onClick={() => setModal(true)}>Модалка</NButton>
            </div>
          </NCard>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NCard title="Прогресс">
            <div className="space-y-4">
              <NProgress value={82} variant="accent" label="Загрузка" showValue />
              <NProgress value={55} variant="success" label="Синхронизация" showValue />
              <NProgress value={30} variant="warning" label="Обработка" showValue />
              <NProgress value={12} variant="danger" label="Ошибки" showValue />
            </div>
          </NCard>
          <NCard title="Карточка с акцентом" accent subtitle="border-l вариант">
            <p className="text-sm text-muted">С акцентной полосой</p>
            <div className="flex gap-2 mt-4">
              <NBadge variant="accent">v1.0</NBadge>
              <NBadge variant="success" dot>стабильно</NBadge>
            </div>
          </NCard>
        </div>
      )}

      <NModal
        open={modal}
        onClose={() => setModal(false)}
        title="Заголовок окна"
        subtitle="Подзаголовок окна"
        footer={(close) => (
          <>
            <NButton variant="ghost" onClick={close}>Отмена</NButton>
            <NButton
              onClick={() => {
                close()
                notify.success('Сохранено')
              }}
            >
              Сохранить
            </NButton>
          </>
        )}
      >
        <p className="text-sm text-muted">
          Модальное окно. Открывается по центру, затемняет фон, закрывается по клику вне области или крестику
        </p>
        <NInput label="Комментарий" placeholder="Оставьте заметку…" className="mt-4" />
      </NModal>
    </div>
  )
}
