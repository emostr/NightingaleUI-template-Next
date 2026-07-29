'use client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import NIcon from './NIcon'

export default function NDropdown({ align = 'right', width = 200, trigger, children }) {
  const [open, setOpen] = useState(false)
  const [render, setRender] = useState(false)
  const [show, setShow] = useState(false)
  const [portalReady, setPortalReady] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0, origin: 'top' })
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => setPortalReady(true), [])

  const close = useCallback(() => setOpen(false), [])

  const place = useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight
    const vw = window.innerWidth
    const gap = 6
    const menuH = menuRef.current?.offsetHeight || 0
    const below = vh - r.bottom
    const flip = below < menuH + gap && r.top > below

    let left = align === 'right' ? r.right - width : r.left
    left = Math.max(8, Math.min(left, vw - width - 8))

    setPos({
      top: flip ? r.top - gap - menuH : r.bottom + gap,
      left,
      origin: flip ? 'bottom' : 'top',
    })
  }, [align, width])

  useEffect(() => {
    if (open) {
      setRender(true)
    } else {
      setShow(false)
      const t = setTimeout(() => setRender(false), 140)
      return () => clearTimeout(t)
    }
  }, [open])

  useLayoutEffect(() => {
    if (!render) return
    place()
    const id = requestAnimationFrame(() => {
      place()
      setShow(true)
    })
    return () => cancelAnimationFrame(id)
  }, [render, place])

  useEffect(() => {
    if (!open) return
    function onDocClick(e) {
      if (triggerRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return
      close()
    }
    function onScroll() {
      close()
    }
    function onKey(e) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('click', onDocClick)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  return (
    <div ref={triggerRef} className="inline-block">
      <div onClick={() => setOpen((o) => !o)}>
        {trigger ?? (
          <button className="p-2 text-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer">
            <NIcon name="more" size={18} />
          </button>
        )}
      </div>

      {portalReady && render
        ? createPortal(
            <div
              ref={menuRef}
              data-show={show}
              onClick={close}
              className="ng-dd fixed z-120 bg-surface border border-line shadow-2xl py-1"
              style={{
                top: pos.top + 'px',
                left: pos.left + 'px',
                width: width + 'px',
                transformOrigin: pos.origin,
              }}
            >
              {children}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
