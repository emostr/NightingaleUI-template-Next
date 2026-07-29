'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const LEAVE_MS = 120

export default function ViewTransition({ children }) {
  const pathname = usePathname()
  const [content, setContent] = useState(children)
  const [phase, setPhase] = useState('idle')
  const keyRef = useRef(pathname)
  const timers = useRef([])

  function clearTimers() {
    timers.current.forEach((h) =>
      typeof h === 'number' ? clearTimeout(h) : cancelAnimationFrame(h),
    )
    timers.current = []
  }

  useEffect(() => clearTimers, [])

  useEffect(() => {
    if (pathname === keyRef.current) {
      setContent(children)
      return
    }
    clearTimers()
    setPhase('leaving')
    const t1 = setTimeout(() => {
      keyRef.current = pathname
      setContent(children)
      setPhase('from')
      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => setPhase('in'))
        timers.current.push(r2)
      })
      timers.current.push(r1)
    }, LEAVE_MS)
    timers.current.push(t1)
  }, [pathname, children])

  return (
    <div className="view-anim" data-phase={phase}>
      {content}
    </div>
  )
}
