import { useParams } from '@tanstack/react-router'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/HeroSection'
import { FloatingCompass } from '@/components/FloatingCompass'
import { FrostCreep } from '@/components/FrostCreep'
import { MapSection } from '@/components/MapSection'
import type { Lang } from '@/lib/types'

/**
 * Landing page — Phase 4: hero + interactive map section.
 * Party grid, wiki sections, and timeline land in Phases 5–6.
 */
export function Landing() {
  const { lang } = useParams({ from: '/$lang/' }) as { lang: Lang }

  return (
    <div className="relative">
      <FrostCreep />
      <FloatingCompass />
      <Topbar lang={lang} />
      <HeroSection lang={lang} />
      <MapSection lang={lang} />

      <main className="mx-auto max-w-4xl px-6 py-16 md:px-14">
        <div className="rounded border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 opacity-60">
          <div className="text-xs uppercase tracking-widest">
            Phase 4 — map ✓
          </div>
          <p className="mt-2 text-sm">
            Interactive map with pan/zoom, pinned tooltips, and edge-flip positioning.
            Party grid, wiki sections, and timeline land in Phases 5–6.
          </p>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
