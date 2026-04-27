import { useLocation, useNavigate } from '@tanstack/react-router'
import { Button } from '@seyo/vellum-ds'
import { useTheme } from '@/lib/theme'
import { useI18n } from '@/lib/queries'
import { t } from '@/lib/i18n'
import { wikiUrl, staticPageUrl } from '@/lib/wikiUrl'
import type { Lang } from '@/lib/types'

interface TopbarProps {
  lang: Lang
}

/**
 * Top navigation bar — brand + section anchors + theme/lang toggles.
 * Mirrors the existing Quartz landing's topbar but driven by router state.
 *
 * In-page anchors (#karta, #parti, #wiki, #tidslinje) target sections that
 * are stubs today and become real in Phases 3–6. External nav (sessions, chat)
 * still points at the Quartz pages until those are ported.
 */
export function Topbar({ lang }: TopbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggle: toggleTheme } = useTheme()
  const { data: i18n } = useI18n()
  const strings = i18n?.[lang]

  const otherLang: Lang = lang === 'sv' ? 'en' : 'sv'

  const handleLangToggle = () => {
    // Preserve sub-path under the lang prefix (e.g. /sv/map → /en/map).
    const newPath = location.pathname.replace(/^\/(sv|en)/, `/${otherLang}`)
    navigate({ to: newPath })
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-14">
      <a
        href={`/${lang}`}
        className="flex items-center gap-3 no-underline"
        onClick={(e) => {
          e.preventDefault()
          navigate({ to: '/$lang', params: { lang } })
        }}
      >
        <span className="text-2xl" aria-hidden="true">❄</span>
        <span className="font-[family-name:var(--font-heading)] text-sm tracking-wider uppercase">
          {t(strings, 'site_title')}
        </span>
      </a>

      <nav className="flex items-center gap-1 md:gap-3">
        <a
          href="#karta"
          className="hidden md:inline-block px-2 py-1 text-xs uppercase tracking-widest opacity-70 hover:opacity-100 no-underline"
        >
          {t(strings, 'nav_map')}
        </a>
        <a
          href="#parti"
          className="hidden md:inline-block px-2 py-1 text-xs uppercase tracking-widest opacity-70 hover:opacity-100 no-underline"
        >
          {t(strings, 'nav_party')}
        </a>
        <a
          href="#wiki"
          className="hidden md:inline-block px-2 py-1 text-xs uppercase tracking-widest opacity-70 hover:opacity-100 no-underline"
        >
          {t(strings, 'nav_wiki')}
        </a>
        <a
          href="#tidslinje"
          className="hidden md:inline-block px-2 py-1 text-xs uppercase tracking-widest opacity-70 hover:opacity-100 no-underline"
        >
          {t(strings, 'nav_timeline')}
        </a>
        <a
          href={wikiUrl(lang, 'Sessions')}
          className="hidden md:inline-block px-2 py-1 text-xs uppercase tracking-widest opacity-70 hover:opacity-100 no-underline"
        >
          {t(strings, 'nav_sessions')}
        </a>
        <a
          href={staticPageUrl(lang, 'chat.html')}
          className="hidden md:inline-block px-2 py-1 text-xs uppercase tracking-widest opacity-70 hover:opacity-100 no-underline"
        >
          {t(strings, 'nav_chat')}
        </a>

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
          onClick={handleLangToggle}
          aria-label="Toggle language"
        >
          {t(strings, 'lang_toggle')}
        </Button>
      </nav>
    </div>
  )
}
