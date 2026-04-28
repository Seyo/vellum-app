import { Button, StatusCard } from '@seyo/vellum-ds'
import { SnowOverlay } from './SnowOverlay'
import { useI18n, useStatus } from '@/lib/queries'
import { t } from '@/lib/i18n'
import { WIKI_BASE_URL } from '@/lib/api'
import type { Lang } from '@/lib/types'

interface HeroSectionProps {
  lang: Lang
}

const MAP_BG_URL = `${WIKI_BASE_URL}/static/assets/maps/icewind-dale.webp`

/**
 * Hero — the heaviest section of the landing.
 * Layered visuals (back-to-front): blurred map background, snow overlay,
 * gradient frost overlay (page.css), copy + CTAs, status card.
 * Scroll cue at the bottom.
 *
 * The fixed-position FloatingCompass and FrostCreep are siblings, not children,
 * because they need to overlay the entire page (not just the hero).
 */
export function HeroSection({ lang }: HeroSectionProps) {
  const { data: i18n } = useI18n()
  const { data: status } = useStatus()
  const strings = i18n?.[lang]
  const statusContent = status?.[lang] ?? status?.sv

  return (
    <header className="relative flex min-h-screen flex-col justify-center pt-32 pb-20">
      <div className="hero-map-bg" aria-hidden="true">
        <img src={MAP_BG_URL} alt="" loading="eager" />
      </div>
      <SnowOverlay />

      <div className="relative z-[2] mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 md:px-14 lg:grid-cols-[1.2fr_0.9fr]">
        <div>
          <div className="mb-6 flex items-center gap-3.5 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-muted-foreground">
            <span className="h-px w-10 bg-muted-foreground/60" aria-hidden="true" />
            <span>{t(strings, 'hero_kicker')}</span>
          </div>

          <h1 className="hero-title m-0 mb-6">
            Rime of the<br />
            <em>Frostmaiden</em>
          </h1>

          <p className="m-0 mb-9 max-w-[46ch] text-[1.2rem] leading-[1.5] text-muted-foreground">
            {t(strings, 'hero_sub')}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href="#karta">{t(strings, 'hero_cta_map')}</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#wiki">{t(strings, 'hero_cta_wiki')}</a>
            </Button>
            <Button asChild variant="ghost">
              <a href={`${WIKI_BASE_URL}/static/chat.html`}>{t(strings, 'hero_cta_chat')}</a>
            </Button>
          </div>
        </div>

        {status && statusContent && (
          <StatusCard
            day={status.day}
            dayLabel={t(strings, 'status_day_label')}
            latestLabel={t(strings, 'status_latest')}
            quote={statusContent.quote}
            attribution={statusContent.attr}
            questions={statusContent.questions}
          />
        )}
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>{t(strings, 'scroll_cue')}</span>
        <div className="scroll-cue-line" />
      </div>
    </header>
  )
}
