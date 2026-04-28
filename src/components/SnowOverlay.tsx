import { useState } from 'react'

interface Flake {
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
}

const COUNT = 60

/**
 * Snow overlay — 60 randomized spans positioned and animated by CSS.
 * Particles are generated once on mount (lazy useState initializer is
 * StrictMode-safe) so they stay stable across re-renders.
 *
 * The CSS keyframe `snowfall` and the base `.snow span` styles live in
 * src/styles/hero.css.
 */
export function SnowOverlay() {
  const [flakes] = useState<Flake[]>(() =>
    Array.from({ length: COUNT }, () => ({
      left: Math.random() * 100,
      size: 1.5 + Math.random() * 3.5,
      duration: 10 + Math.random() * 18,
      delay: -Math.random() * 20,
      drift: (Math.random() - 0.5) * 220,
      opacity: 0.4 + Math.random() * 0.5,
    })),
  )

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((f, i) => (
        <span
          key={i}
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            opacity: f.opacity,
            ['--drift' as string]: `${f.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
