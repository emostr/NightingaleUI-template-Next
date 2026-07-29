'use client'
import { useRouter } from 'next/navigation'
import NButton from '@/components/ui/NButton'

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg p-6 text-center">
      <div className="ng-enter">
        <div className="text-[7rem] sm:text-[10rem] font-extrabold text-ink leading-none tracking-normal">
          4<span className="text-accent">0</span>4
        </div>
        <div className="w-16 h-1 bg-accent mx-auto mb-6" />
        <h1 className="text-xl font-bold text-ink">Страница не найдена</h1>
        <p className="text-muted mt-2 max-w-sm mx-auto">
          Возможно, она была перемещена или удалена. А может, её и не было никогда
        </p>
        <div className="flex items-center justify-center gap-2.5 mt-8">
          <NButton variant="secondary" icon="chevronLeft" onClick={() => router.back()}>Назад</NButton>
          <NButton icon="home" onClick={() => router.push('/')}>На главную</NButton>
        </div>
      </div>
    </div>
  )
}
