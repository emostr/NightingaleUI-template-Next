'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const THEME_KEY = 'ng-theme'
const ACCENT_KEY = 'ng-accent'

export const ACCENTS = [
  { id: 'teal', label: 'Teal', hex: '#00b294' },
  { id: 'azure', label: 'Azure', hex: '#0078d4' },
  { id: 'magenta', label: 'Magenta', hex: '#e3008c' },
  { id: 'amber', label: 'Amber', hex: '#e88c00' },
  { id: 'violet', label: 'Violet', hex: '#8764b8' },
  { id: 'lime', label: 'Lime', hex: '#7cbb00' },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [accent, setAccentState] = useState('teal')

  useEffect(() => {
    let t = 'dark'
    let a = 'teal'
    try {
      t = localStorage.getItem(THEME_KEY) || 'dark'
      a = localStorage.getItem(ACCENT_KEY) || 'teal'
    } catch {}
    setTheme(t)
    setAccentState(a)
    const el = document.documentElement
    el.setAttribute('data-theme', t)
    el.setAttribute('data-accent', a)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem(THEME_KEY, next)
      } catch {}
      return next
    })
  }, [])

  const setAccent = useCallback((id) => {
    setAccentState(id)
    document.documentElement.setAttribute('data-accent', id)
    try {
      localStorage.setItem(ACCENT_KEY, id)
    } catch {}
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, accent, toggleTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
