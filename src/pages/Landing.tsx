import { useParams } from '@tanstack/react-router'
import { Button } from '@seyo/vellum-ds'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/lib/queries'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/types'

/**
 * Landing page — Phase 2 layout: real Topbar + Footer chrome around a hero
 * placeholder. Hero, map, party, wiki, and timeline sections land in Phases 3–6.
 */
export function Landing() {
  const { lang } = useParams({ from: '/$lang/' }) as { lang: Lang }
  const { data: i18n, isLoading, error } = useI18n()
  const strings = i18n?.[lang]

  return (
    <div className="relative min-h-screen">
      <Topbar lang={lang} />

      <main className="mx-auto max-w-4xl px-6 pt-32 pb-16 md:px-14">
        <div className="text-xs uppercase tracking-widest opacity-70">
          {isLoading
            ? '…'
            : error
            ? `Error loading i18n: ${(error as Error).message}`
            : t(strings, 'hero_kicker')}
        </div>

        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl leading-tight md:text-6xl">
          Rime of the <em>Frostmaiden</em>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
          {t(strings, 'hero_sub')}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button>{t(strings, 'hero_cta_map')}</Button>
          <Button variant="outline">{t(strings, 'hero_cta_wiki')}</Button>
          <Button variant="ghost">{t(strings, 'hero_cta_chat')}</Button>
        </div>

        <div className="mt-16 rounded border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 opacity-60">
          <div className="text-xs uppercase tracking-widest">
            Phase 2 — chrome only
          </div>
          <p className="mt-2 text-sm">
            Topbar + footer wired. Hero map, status card, snow, scroll-driven compass,
            party grid, wiki sections, timeline, and map canvas land in Phases 3–6.
          </p>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
