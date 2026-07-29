'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import NIcon from './NIcon'

const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }

export default function NModal({
  open = false,
  onClose,
  title = '',
  subtitle = '',
  size = 'md',
  footer,
  children,
}) {
  const [render, setRender] = useState(false)
  const [show, setShow] = useState(false)
  const [portalReady, setPortalReady] = useState(false)

  useEffect(() => setPortalReady(true), [])

  function close() {
    onClose?.()
  }

  useEffect(() => {
    if (open) {
      setRender(true)
      const id = requestAnimationFrame(() => setShow(true))
      return () => cancelAnimationFrame(id)
    }
    setShow(false)
    const t = setTimeout(() => setRender(false), 240)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(
    () => () => {
      document.body.style.overflow = ''
    },
    [],
  )

  if (!portalReady || !render) return null

  return createPortal(
    <div
      data-show={show}
      className="ng-overlay fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" onClick={close} />
      <div
        data-show={show}
        role="dialog"
        aria-modal="true"
        className={cn(
          'ng-modal-panel relative w-full bg-surface border border-line border-l-[3px] border-l-accent shadow-2xl mt-8 sm:mt-16',
          sizes[size] || sizes.md,
        )}
      >
        <header className="flex items-start justify-between gap-4 px-6 py-4 border-b border-line">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-ink truncate">{title}</h3>
            {subtitle ? <p className="text-sm text-muted mt-0.5">{subtitle}</p> : null}
          </div>
          <button
            onClick={close}
            className="shrink-0 -mr-1 p-1 text-muted hover:text-danger transition-colors cursor-pointer"
          >
            <NIcon name="close" size={20} />
          </button>
        </header>

        <div className="px-6 py-5">{children}</div>

        {footer ? (
          <footer className="flex items-center justify-end gap-2 px-6 py-4 border-t border-line bg-surface-2/40">
            {typeof footer === 'function' ? footer(close) : footer}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
