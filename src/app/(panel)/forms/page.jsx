'use client'
import { useState } from 'react'
import NPageHeader from '@/components/ui/NPageHeader'
import NCard from '@/components/ui/NCard'
import NButton from '@/components/ui/NButton'
import NInput from '@/components/ui/NInput'
import NTextarea from '@/components/ui/NTextarea'
import NSelect from '@/components/ui/NSelect'
import NDateInput from '@/components/ui/NDateInput'
import NToggle from '@/components/ui/NToggle'
import NCheckbox from '@/components/ui/NCheckbox'
import NRadioGroup from '@/components/ui/NRadioGroup'
import { notify } from '@/lib/notify'

const emptyForm = {
  name: '',
  email: '',
  company: '',
  country: '',
  birthday: '',
  bio: '',
  plan: 'pro',
  newsletter: true,
  terms: false,
}

export default function FormsView() {
  const [form, setForm] = useState(emptyForm)

  const set = (field) => (value) => setForm((prev) => ({ ...prev, [field]: value }))

  async function submit() {
    if (!form.terms) {
      notify.warning('Примите условия использования')
      return
    }
    notify.success('Профиль сохранён', { text: 'Все изменения применены.' })
  }

  async function reset() {
    const ok = await notify.confirm({
      title: 'Сбросить форму?',
      text: 'Введённые данные будут очищены.',
      confirmText: 'Сбросить',
      danger: true,
    })
    if (ok) {
      setForm(emptyForm)
      notify.toast('Форма очищена', { icon: 'info' })
    }
  }

  return (
    <div>
      <NPageHeader title="Формы" subtitle="Компоновка полей и валидация" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <NCard accent title="Профиль" subtitle="Основные данные аккаунта">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NInput value={form.name} onChange={set('name')} label="Имя" placeholder="Иван Иванов" icon="user" required />
              <NInput value={form.email} onChange={set('email')} label="E-mail" type="email" placeholder="mail@example.com" icon="mail" required />
              <NInput value={form.company} onChange={set('company')} label="Компания" placeholder="ООО «Тмыв денег»" icon="box" />
              <NSelect value={form.country} onChange={set('country')} label="Страна" options={['Россия', 'Беларусь', 'Украина', 'Казахстан']} />
              <NDateInput value={form.birthday} onChange={set('birthday')} label="Дата рождения" hint="Я календарь я календарь я календарь я календарь" />
            </div>
            <div className="mt-4">
              <NTextarea value={form.bio} onChange={set('bio')} label="О себе" placeholder="Коротко о себе…" rows={4} hint="Максимум 240 символов" />
            </div>
          </NCard>

          <NCard
            title="Предпочтения"
            footer={
              <div className="flex items-center justify-end gap-2">
                <NButton variant="ghost" onClick={reset}>Сбросить</NButton>
                <NButton icon="check" onClick={submit}>Сохранить</NButton>
              </div>
            }
          >
            <div className="space-y-5">
              <NRadioGroup
                value={form.plan}
                onChange={set('plan')}
                label="Тарифный план"
                inline
                options={[
                  { value: 'free', label: 'Бесплатный' },
                  { value: 'pro', label: 'Pro' },
                  { value: 'team', label: 'Команда' },
                ]}
              />
              <div className="border-t border-line pt-5 space-y-3">
                <NToggle checked={form.newsletter} onChange={set('newsletter')} label="Получать новости и обновления" />
                <NCheckbox checked={form.terms} onChange={set('terms')} label="Я принимаю условия использования" />
              </div>
            </div>
          </NCard>
        </div>

        <div className="space-y-6">
          <NCard title="Состояния полей">
            <div className="space-y-4">
              <NInput label="Обычное" placeholder="Введите текст" />
              <NInput label="С подсказкой" placeholder="user@mail.com" hint="Используется для входа" />
              <NInput label="С ошибкой" value="123" error="Минимум 8 символов" />
              <NInput label="Отключено" value="Только чтение" disabled />
            </div>
          </NCard>

          <NCard title="Предпросмотр" subtitle="Живые данные формы">
            <pre className="text-xs text-muted bg-surface-2 border border-line p-3 overflow-x-auto">
              {JSON.stringify(form, null, 2)}
            </pre>
          </NCard>
        </div>
      </div>
    </div>
  )
}
