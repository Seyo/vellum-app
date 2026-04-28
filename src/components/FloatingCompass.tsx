import { useScrollProgress } from '@/lib/scroll'

/**
 * Floating compass — pinned bottom-right, rotates as you scroll the page.
 * Hidden on mobile via .hero-compass media query in hero.css.
 */
export function FloatingCompass() {
  const p = useScrollProgress()
  const rot = `${p * 140}deg`

  return (
    <div
      className="hero-compass"
      style={{ transform: `rotate(${rot})` }}
      aria-hidden="true"
    >
      <svg width="72" height="72" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="0.4" opacity="0.35" />
        <path d="M60 8 L66 56 L60 60 L54 56 Z" fill="currentColor" opacity="0.9" />
        <path d="M60 112 L66 64 L60 60 L54 64 Z" fill="currentColor" opacity="0.55" />
        <path d="M8 60 L56 66 L60 60 L56 54 Z" fill="currentColor" opacity="0.55" />
        <path d="M112 60 L64 66 L60 60 L64 54 Z" fill="currentColor" opacity="0.55" />
        <path
          d="M23 23 L54 54 L60 60 L54 66 L23 97 Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
        <g
          fontFamily="var(--font-heading)"
          fontSize="10"
          fill="currentColor"
          textAnchor="middle"
        >
          <text x="60" y="6" dominantBaseline="hanging">N</text>
          <text x="60" y="119">S</text>
          <text x="4" y="63">V</text>
          <text x="116" y="63">Ö</text>
        </g>
        <circle cx="60" cy="60" r="3" fill="currentColor" />
      </svg>
    </div>
  )
}
