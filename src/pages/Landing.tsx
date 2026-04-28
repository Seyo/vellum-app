import { useParams } from '@tanstack/react-router'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/HeroSection'
import { FloatingCompass } from '@/components/FloatingCompass'
import { FrostCreep } from '@/components/FrostCreep'
import { MapSection } from '@/components/MapSection'
import { PartySection } from '@/components/PartySection'
import { WikiSectionsSection } from '@/components/WikiSectionsSection'
import { TimelineSection } from '@/components/TimelineSection'
import type { Lang } from '@/lib/types'

/**
 * Landing page — Phase 6: full landing parity (hero + map + party + wiki + timeline).
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
      <PartySection lang={lang} />
      <WikiSectionsSection lang={lang} />
      <TimelineSection lang={lang} />

      <Footer lang={lang} />
    </div>
  )
}
