import { Link, useParams, useNavigate } from '@tanstack/react-router'
import { Button } from '@seyo/vellum-ds'
import { useI18n } from '@/lib/queries'
import { t } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import type { Lang } from '@/lib/types'

/**
 * Phase 1 landing skeleton: just a title, theme/lang toggles, and a vellum-ds Button —
 * enough to prove the integration end-to-end (router, i18n fetch, theme, design system).
 * Actual sections (hero, map, party, wiki, timeline) ship in later phases.
 */
export function Landing() {
  const { lang } = useParams({ from: '/$lang/' }) as { lang: Lang }
  const navigate = useNavigate()
  const { theme, toggle: toggleTheme } = useTheme()
  const { data: i18n, isLoading, error } = useI18n()
  const strings = i18n?.[lang]
  const otherLang: Lang = lang === 'sv' ? 'en' : 'sv'

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-12 flex items-center justify-between">
        <span className="text-2xl">❄</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? t(strings, 'theme_day') : t(strings, 'theme_night')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: '/$lang', params: { lang: otherLang } })}
            aria-label="Toggle language"
          >
            {t(strings, 'lang_toggle')}
          </Button>
        </div>
      </header>

      <h1 className="font-[family-name:var(--font-heading)] text-5xl">
        Rime of the <em>Frostmaiden</em>
      </h1>

      <p className="mt-6 text-lg leading-relaxed">
        {isLoading
          ? '…'
          : error
          ? `Error loading i18n: ${(error as Error).message}`
          : t(strings, 'hero_kicker')}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button>{t(strings, 'hero_cta_map')}</Button>
        <Button variant="outline">{t(strings, 'hero_cta_wiki')}</Button>
        <Button variant="ghost">{t(strings, 'hero_cta_chat')}</Button>
      </div>

      <footer className="mt-24 border-t pt-6 text-sm opacity-70">
        <Link
          to="/$lang"
          params={{ lang: 'sv' }}
          className="underline-offset-4 hover:underline"
        >
          /sv
        </Link>
        {' · '}
        <Link
          to="/$lang"
          params={{ lang: 'en' }}
          className="underline-offset-4 hover:underline"
        >
          /en
        </Link>
        {' · vellum-app skeleton — Phase 1'}
      </footer>
    </main>
  )
}
