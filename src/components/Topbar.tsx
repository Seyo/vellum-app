import { useLocation, useNavigate } from '@tanstack/react-router'
import { useTheme } from '@/lib/theme'
import { useI18n } from '@/lib/queries'
import { t } from '@/lib/i18n'
import { wikiUrl, staticPageUrl } from '@/lib/wikiUrl'
import type { Lang } from '@/lib/types'

interface TopbarProps {
  lang: Lang
}

export function Topbar({ lang }: TopbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggle: toggleTheme } = useTheme()
  const { data: i18n } = useI18n()
  const strings = i18n?.[lang]

  const otherLang: Lang = lang === 'sv' ? 'en' : 'sv'

  const handleLangToggle = () => {
    const newPath = location.pathname.replace(/^\/(sv|en)/, `/${otherLang}`)
    navigate({ to: newPath })
  }

  return (
    <div className="topbar">
      <a
        href={`/${lang}`}
        className="brand"
        onClick={(e) => {
          e.preventDefault()
          navigate({ to: '/$lang', params: { lang } })
        }}
      >
        <div className="brand-mark" aria-hidden="true">❄</div>
        <span>{t(strings, 'site_title')}</span>
      </a>

      <nav className="topnav">
        <a href="#karta">{t(strings, 'nav_map')}</a>
        <a href="#parti">{t(strings, 'nav_party')}</a>
        <a href="#wiki">{t(strings, 'nav_wiki')}</a>
        <a href="#tidslinje">{t(strings, 'nav_timeline')}</a>
        <a href={wikiUrl(lang, 'Sessions')}>{t(strings, 'nav_sessions')}</a>
        <a href={staticPageUrl(lang, 'chat.html')}>{t(strings, 'nav_chat')}</a>

        <button
          type="button"
          className="topnav-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? t(strings, 'theme_day') : t(strings, 'theme_night')}
        </button>
        <button
          type="button"
          className="topnav-btn"
          onClick={handleLangToggle}
          aria-label="Toggle language"
        >
          {t(strings, 'lang_toggle')}
        </button>
      </nav>
    </div>
  )
}
