import { cn } from '@/lib/cn'

export default function NAvatar({ name = '', src = '', size = 40, square = true }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center overflow-hidden bg-accent text-on-accent font-bold shrink-0',
        square ? '' : 'rounded-full',
      )}
      style={{ width: size + 'px', height: size + 'px', fontSize: size * 0.38 + 'px' }}
    >
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </span>
  )
}
