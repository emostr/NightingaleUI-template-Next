'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import NInput from '@/components/ui/NInput'
import NButton from '@/components/ui/NButton'
import NCheckbox from '@/components/ui/NCheckbox'
import { notify } from '@/lib/notify'

export default function LoginView() {
  const router = useRouter()
  const [email, setEmail] = useState('stevejobs@example.com')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Вход · NightingaleUI'
  }, [])

  function submit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      notify.toast('Вход выполнен', { icon: 'success' })
      router.push('/')
    }, 900)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-bg">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-accent text-on-accent relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-72 h-72 border-[24px] border-on-accent/10" />
        <div className="absolute right-20 bottom-24 w-40 h-40 bg-on-accent/10" />
        <div className="flex items-center gap-2.5 relative">
          <span className="w-9 h-9 bg-on-accent flex items-center justify-center">
            <span className="w-4 h-4 bg-accent" />
          </span>
          <span className="text-xl font-extrabold tracking-normal">NightingaleUI</span>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-extrabold leading-tight tracking-normal">
            Панель<br />управления
          </h1>
          <p className="mt-4 text-on-accent/80 max-w-sm">Шаблон дашборда администратора</p>
        </div>
        <div className="relative text-sm text-on-accent/70">© 2026 NightingaleUI</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm ng-enter">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <span className="w-8 h-8 bg-accent flex items-center justify-center">
              <span className="w-3.5 h-3.5 bg-bg" />
            </span>
            <span className="font-extrabold text-ink">
              Nightingale<span className="text-accent">UI</span>
            </span>
          </div>

          <div className="w-10 h-1 bg-accent mb-4" />
          <h2 className="text-2xl font-extrabold text-ink tracking-normal">С возвращением</h2>
          <p className="text-muted text-sm mt-1 mb-8">Войдите, чтобы продолжить работу</p>

          <form className="space-y-4" onSubmit={submit}>
            <NInput value={email} onChange={setEmail} label="E-mail" type="email" placeholder="mail@example.com" icon="mail" />
            <NInput value={password} onChange={setPassword} label="Пароль" type="password" placeholder="••••••••" icon="lock" />
            <div className="flex items-center justify-between">
              <NCheckbox checked={remember} onChange={setRemember} label="Запомнить меня" />
              <a href="#" className="text-sm text-accent font-semibold hover:underline">Забыли пароль?</a>
            </div>
            <NButton type="submit" block size="lg" loading={loading} iconRight="arrowRight">Войти</NButton>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-line" />
            <span className="text-xs text-faint uppercase tracking-normal">или</span>
            <div className="flex-1 h-px bg-line" />
          </div>

          <NButton variant="secondary" block icon="user" onClick={() => router.push('/')}>Продолжить как гость</NButton>

          <p className="text-center text-sm text-muted mt-8">
            Нет аккаунта?
            <a href="#" className="text-accent font-semibold hover:underline"> Регистрация</a>
          </p>
        </div>
      </div>
    </div>
  )
}
