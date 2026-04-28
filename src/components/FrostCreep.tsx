import { useScrollProgress } from '@/lib/scroll'

/**
 * Frost creep overlay — fixed full-viewport gradient layer that fades in as the
 * user scrolls. Pure presentational; opacity driven by the shared scroll hook.
 */
export function FrostCreep() {
  const p = useScrollProgress()
  const opacity = Math.min(0.55, p * 0.9)
  return <div className="frost-creep" style={{ opacity }} aria-hidden="true" />
}
