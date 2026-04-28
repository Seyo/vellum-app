import { useEffect } from 'react'
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

export function Landing() {
  const { lang } = useParams({ from: '/$lang/' }) as { lang: Lang }

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'sv'
  }, [lang])

  return (
    <div className="relative">
      <FrostCreep />
      <FloatingCompass />
      <Topbar lang={lang} />
      <HeroSection lang={lang} />
      <MapSection lang={lang} />
      <div className="rule-ornament" aria-hidden="true"><span className="glyph">✦</span></div>
      <PartySection lang={lang} />
      <div className="rule-ornament" aria-hidden="true"><span className="glyph">❋</span></div>
      <WikiSectionsSection lang={lang} />
      <div className="rule-ornament" aria-hidden="true"><span className="glyph">✧</span></div>
      <TimelineSection lang={lang} />

      <Footer lang={lang} />
    </div>
  )
}
