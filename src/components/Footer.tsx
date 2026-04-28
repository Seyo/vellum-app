import { useTheme } from '@/lib/theme'
import { useI18n } from '@/lib/queries'
import { t } from '@/lib/i18n'
import { WIKI_BASE_URL } from '@/lib/api'
import type { Lang } from '@/lib/types'

interface FooterProps {
  lang: Lang
}

/**
 * Footer — static "Frostmaiden · 2026" + theme-aware variant string + wiki link.
 * Theme variant matches the existing landing: "Frost-vellum · Dagkrönika" (light)
 * vs "Nattbok · Nordens mörka timmar" (dark), in the active language.
 */
export function Footer({ lang }: FooterProps) {
  const { theme } = useTheme()
  const { data: i18n } = useI18n()
  const strings = i18n?.[lang]

  const variantKey = theme === 'dark' ? 'footer_night' : 'footer_day'

  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[color:var(--color-border)] px-6 pb-10 pt-14 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground md:px-14">
      <span>Frostmaiden · 2026</span>
      <span>{t(strings, variantKey)}</span>
      <a
        href={WIKI_BASE_URL}
        className="underline-offset-4 hover:underline"
      >
        seyo.github.io/frostmaiden-campaign
      </a>
    </footer>
  )
}
