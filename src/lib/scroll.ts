/**
 * useScrollProgress — single shared scroll listener that publishes 0..1 progress
 * to all subscribers. Uses useSyncExternalStore so multiple components (compass,
 * frost overlay, etc.) share one listener with no extra renders when the value
 * hasn't changed.
 */
import { useSyncExternalStore } from 'react'

let progress = 0
const listeners = new Set<() => void>()

function read() {
  if (typeof window === 'undefined') return
  const root = document.documentElement
  const h = root.scrollHeight - root.clientHeight
  const p = h > 0 ? Math.min(1, root.scrollTop / h) : 0
  if (p !== progress) {
    progress = p
    listeners.forEach((cb) => cb())
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  if (listeners.size === 1) {
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read, { passive: true })
    read()
  }
  return () => {
    listeners.delete(cb)
    if (listeners.size === 0) {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }
}

export function useScrollProgress(): number {
  return useSyncExternalStore(
    subscribe,
    () => progress,
    () => 0,
  )
}
