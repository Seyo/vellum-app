import { WikiSectionCard } from '@seyo/vellum-ds'
import { useI18n, useWikiSections } from '@/lib/queries'
import { t, tf, pickLangValue } from '@/lib/i18n'
import { wikiUrl } from '@/lib/wikiUrl'
import type { Lang } from '@/lib/types'

interface WikiSectionsSectionProps {
  lang: Lang
}

const PREVIEW_LIMIT = 5

/**
 * Wiki section grid — 6 section cards driven by the wiki-sections JSON.
 * Each card previews the first 5 items and shows "+ N fler" when there are more.
 */
export function WikiSectionsSection({ lang }: WikiSectionsSectionProps) {
  const { data: i18n } = useI18n()
  const { data: sections } = useWikiSections()
  const strings = i18n?.[lang]

  return (
    <section id="wiki" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-14">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-muted-foreground">
              {t(strings, 'wiki_chapter')}
            </div>
            <h2 className="section-h2">
              {t(strings, 'wiki_heading')}
            </h2>
          </div>
          <p className="m-0 max-w-[44ch] text-[1.05rem] text-muted-foreground">
            {t(strings, 'wiki_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {sections?.map((s) => {
            const preview = s.items.slice(0, PREVIEW_LIMIT)
            const overflow = s.items.length - PREVIEW_LIMIT
            return (
              <WikiSectionCard
                key={s.slug}
                title={pickLangValue(lang, s.title, s.title_en)}
                subtitle={pickLangValue(lang, s.subtitle, s.subtitle_en)}
                count={s.count}
                items={preview}
                overflowLabel={overflow > 0 ? tf(strings, 'wiki_more', overflow) : undefined}
                footerLabel={t(strings, 'wiki_open')}
                href={wikiUrl(lang, s.slug)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
