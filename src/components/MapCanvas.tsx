import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { MapPin, MapTooltip } from '@seyo/vellum-ds'
import { useI18n, useMapPins } from '@/lib/queries'
import { t, tf, pickLangValue } from '@/lib/i18n'
import { wikiUrl } from '@/lib/wikiUrl'
import { WIKI_BASE_URL } from '@/lib/api'
import type { Lang, MapPin as MapPinData } from '@/lib/types'

const MAP_IMG_URL = `${WIKI_BASE_URL}/static/assets/maps/icewind-dale.webp`

const MIN_SCALE = 1
const MAX_SCALE = 5
const ZOOM_STEP = 1.15

interface MapCanvasProps {
  lang: Lang
}

interface TooltipPos {
  left: number
  top: number
  flipX: string
  flipY: string
}

/**
 * Interactive Icewind Dale map: wheel zoom (toward cursor), drag pan when zoomed,
 * double-click reset, click pin to pin tooltip, escape to close. Mirrors the
 * existing Quartz landing's behavior 1:1 with React state instead of imperative DOM.
 *
 * Pins (vellum-ds <MapPin>) live inside the transformed zoom container so they
 * pan/zoom with the image. The tooltip (vellum-ds <MapTooltip>) lives in a
 * sibling portal layer outside the transform, positioned by reading the active
 * pin's bounding rect — keeps the tooltip readable regardless of zoom level.
 */
export function MapCanvas({ lang }: MapCanvasProps) {
  const { data: pins } = useMapPins()
  const { data: i18n } = useI18n()
  const strings = i18n?.[lang]

  const wrapRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)

  const [transform, setTransform] = useState({ scale: 1, tx: 0, ty: 0 })
  const [pinned, setPinned] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<TooltipPos | null>(null)

  const draggingRef = useRef(false)
  const lastDragRef = useRef({ x: 0, y: 0 })

  const shown = pinned ?? hovered
  const activePin: MapPinData | undefined = shown
    ? pins?.find((p) => p.id === shown)
    : undefined

  // ─── Transform helpers ──────────────────────────────────────────────────
  const clamp = useCallback((scale: number, tx: number, ty: number) => {
    const wrap = wrapRef.current
    if (!wrap) return { scale, tx, ty }
    const W = wrap.offsetWidth
    const H = wrap.offsetHeight
    return {
      scale,
      tx: Math.min(0, Math.max(tx, W * (1 - scale))),
      ty: Math.min(0, Math.max(ty, H * (1 - scale))),
    }
  }, [])

  // ─── Wheel: zoom toward cursor ──────────────────────────────────────────
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const wrap = wrapRef.current
      if (!wrap) return
      const r = wrap.getBoundingClientRect()
      const mx = e.clientX - r.left
      const my = e.clientY - r.top
      setTransform((prev) => {
        const ns = Math.min(
          MAX_SCALE,
          Math.max(MIN_SCALE, prev.scale * (e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP)),
        )
        const tx = mx - (mx - prev.tx) * (ns / prev.scale)
        const ty = my - (my - prev.ty) * (ns / prev.scale)
        return clamp(ns, tx, ty)
      })
    },
    [clamp],
  )

  // ─── Mouse: pan when zoomed > 1 ─────────────────────────────────────────
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (transform.scale <= 1) return
      const target = e.target as HTMLElement
      if (target.closest('button[data-pin]')) return
      draggingRef.current = true
      lastDragRef.current = { x: e.clientX, y: e.clientY }
      wrapRef.current?.classList.add('panning')
      e.preventDefault()
    },
    [transform.scale],
  )

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!draggingRef.current) return
      const dx = e.clientX - lastDragRef.current.x
      const dy = e.clientY - lastDragRef.current.y
      lastDragRef.current = { x: e.clientX, y: e.clientY }
      setTransform((prev) => clamp(prev.scale, prev.tx + dx, prev.ty + dy))
    }
    function onUp() {
      if (!draggingRef.current) return
      draggingRef.current = false
      wrapRef.current?.classList.remove('panning')
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [clamp])

  // ─── Double-click on background: reset transform ────────────────────────
  const onDblClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('button[data-pin]')) return
    setTransform({ scale: 1, tx: 0, ty: 0 })
  }, [])

  // ─── Click on background: clear pinned/hovered ──────────────────────────
  const onBackgroundClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('button[data-pin]')) return
    if (target.closest('[role="dialog"]')) return
    setPinned(null)
    setHovered(null)
  }, [])

  // ─── Escape: close pinned tooltip ───────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setPinned(null)
        setHovered(null)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // ─── Compute tooltip position whenever active pin or transform changes ──
  useLayoutEffect(() => {
    if (!activePin) {
      setTooltipPos(null)
      return
    }
    const portal = portalRef.current
    const btn = wrapRef.current?.querySelector<HTMLButtonElement>(
      `button[data-pin="${activePin.id}"]`,
    )
    if (!portal || !btn) return
    const pr = portal.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    const cx = br.left + br.width / 2 - pr.left
    const cy = br.top + br.height / 2 - pr.top
    setTooltipPos({
      left: cx,
      top: cy,
      flipX: cx / pr.width > 0.6 ? '-100%' : '0%',
      flipY: cy / pr.height > 0.55 ? '-100%' : '0%',
    })
  }, [activePin, transform])

  // Recompute tooltip position on window resize.
  useEffect(() => {
    function onResize() {
      // trigger a re-render that re-runs the layout effect
      setTransform((prev) => ({ ...prev }))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!pins) return null

  const canPan = transform.scale > 1

  return (
    <div className="map-frame">
      <div className="map-frame-inner">
        <div
          ref={wrapRef}
          className={`map-wrap${canPan ? ' can-pan' : ''}`}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onDoubleClick={onDblClick}
          onClick={onBackgroundClick}
        >
          <div
            ref={zoomRef}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `translate(${transform.tx}px, ${transform.ty}px) scale(${transform.scale})`,
              transformOrigin: '0 0',
            }}
          >
            <img className="map-img" src={MAP_IMG_URL} alt={t(strings, 'map_alt')} draggable={false} />
            <div className="map-tint" aria-hidden="true" />

            {pins.map((p) => {
              const name = pickLangValue(lang, p.name, p.name_en)
              return (
                <MapPin
                  key={p.id}
                  data-pin={p.id}
                  type={p.type}
                  active={shown === p.id}
                  label={p.label ? name : undefined}
                  aria-label={name}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setPinned((prev) => (prev === p.id ? null : p.id))
                  }}
                />
              )
            })}
          </div>
        </div>

        <div
          ref={portalRef}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          {activePin && tooltipPos && (
            <MapTooltip
              category={t(strings, 'tooltip_type')}
              title={pickLangValue(lang, activePin.name, activePin.name_en)}
              description={pickLangValue(lang, activePin.blurb, activePin.blurb_en) ?? ''}
              linkHref={wikiUrl(lang, activePin.slug)}
              linkText={t(strings, 'tooltip_open')}
              flipX={tooltipPos.flipX}
              flipY={tooltipPos.flipY}
              style={{
                left: tooltipPos.left,
                top: tooltipPos.top,
                pointerEvents: 'auto',
              }}
            />
          )}
        </div>
      </div>

      <div className="map-legend">
        <span>❄ {tf(strings, 'map_pins_count', pins.length)}</span>
        <span>{t(strings, 'map_scale')}</span>
      </div>
    </div>
  )
}
