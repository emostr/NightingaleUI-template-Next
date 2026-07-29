'use client'
import NPageHeader from '@/components/ui/NPageHeader'
import NCard from '@/components/ui/NCard'
import NButton from '@/components/ui/NButton'
import NAlert from '@/components/ui/NAlert'
import { notify } from '@/lib/notify'

export default function NotificationsView() {
  async function doConfirm() {
    const ok = await notify.confirm({
      title: 'Удалить проект?',
      text: 'Все связанные данные будут потеряны.',
      confirmText: 'Удалить',
      danger: true,
    })
    notify[ok ? 'success' : 'info'](ok ? 'Проект удалён' : 'Отменено')
  }

  async function doPrompt() {
    const name = await notify.prompt({
      title: 'Новая папка',
      inputLabel: 'Название',
      placeholder: 'Без названия',
    })
    if (name) notify.toast(`Создано: ${name}`)
  }

  return (
    <div>
      <NPageHeader title="Уведомления" subtitle="Всплывающие окна на базе sweetalert2-neutral" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NCard title="Таймерные попапы" subtitle="Появляются сверху, исчезают сами">
          <div className="flex flex-wrap gap-2.5">
            <NButton icon="check" onClick={() => notify.success('Операция выполнена')}>Success</NButton>
            <NButton variant="danger" icon="close" onClick={() => notify.error('Произошла ошибка', { text: 'Попробуйте позже.' })}>Error</NButton>
            <NButton variant="secondary" icon="alert" onClick={() => notify.warning('Требуется внимание')}>Warning</NButton>
            <NButton variant="subtle" icon="info" onClick={() => notify.info('Доступно обновление')}>Info</NButton>
          </div>
        </NCard>

        <NCard title="Тосты" subtitle="Уголок экрана, компактные">
          <div className="flex flex-wrap gap-2.5">
            <NButton variant="secondary" onClick={() => notify.toast('Сохранено')}>Успех</NButton>
            <NButton variant="secondary" onClick={() => notify.toast('Скопировано в буфер', { icon: 'info' })}>Инфо</NButton>
            <NButton variant="secondary" onClick={() => notify.toast('Проверьте соединение', { icon: 'warning' })}>Внимание</NButton>
            <NButton variant="secondary" onClick={() => notify.toast('Не удалось', { icon: 'error' })}>Ошибка</NButton>
          </div>
        </NCard>

        <NCard title="Диалоги" subtitle="Требуют ответа пользователя">
          <div className="flex flex-wrap gap-2.5">
            <NButton variant="danger" icon="trash" onClick={doConfirm}>Confirm (удаление)</NButton>
            <NButton variant="secondary" icon="edit" onClick={doPrompt}>Prompt (ввод)</NButton>
          </div>
        </NCard>

        <NCard title="Встроенные уведомления">
          <div className="space-y-3">
            <NAlert variant="info">Панель работает в демо-режиме — данные не сохраняются.</NAlert>
            <NAlert variant="success" title="Синхронизировано" closable>Последнее обновление: только что.</NAlert>
            <NAlert variant="danger" title="Ошибка соединения">Проверьте настройки сети.</NAlert>
          </div>
        </NCard>
      </div>
    </div>
  )
}
