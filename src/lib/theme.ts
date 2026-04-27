/**
 * Theme management. Mirrors vellum-ds's convention: `.dark` class on <html>.
 * Persists to localStorage; initializes from system preference on first visit.
 */
import { useEffect, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'

export type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

// Tiny external store so theme can change without a parent re-render mechanism.
const listeners = new Set<() => void>()
let current: Theme = typeof window === 'undefined' ? 'light' : getInitialTheme()

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function setTheme(next: Theme) {
  current = next
  localStorage.setItem(STORAGE_KEY, next)
  applyTheme(next)
  listeners.forEach((cb) => cb())
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => current,
    () => 'light' as Theme,
  )

  useEffect(() => {
    applyTheme(current)
  }, [])

  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  return { theme, toggle, setTheme }
}
