import { CharacterCard } from '@seyo/vellum-ds'
import { useCharacters, useI18n } from '@/lib/queries'
import { t, pickLangValue } from '@/lib/i18n'
import { wikiUrl } from '@/lib/wikiUrl'
import { WIKI_BASE_URL } from '@/lib/api'
import type { Lang } from '@/lib/types'

interface PartySectionProps {
  lang: Lang
}

/**
 * Party grid — 4 character cards driven by the characters JSON.
 * Portraits are absolute URLs into the frostmaiden-campaign Pages site,
 * derived from each character's `portrait` path (which uses `./assets/...`
 * in the source so it works for the existing Quartz landing too).
 */
export function PartySection({ lang }: PartySectionProps) {
  const { data: i18n } = useI18n()
  const { data: characters } = useCharacters()
  const strings = i18n?.[lang]

  return (
    <section id="parti" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-14">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-muted-foreground">
              {t(strings, 'party_chapter')}
            </div>
            <h2 className="section-h2">
              {t(strings, 'party_heading')}
            </h2>
          </div>
          <p className="m-0 max-w-[44ch] text-[1.05rem] text-muted-foreground">
            {t(strings, 'party_desc')}
          </p>
        </div>

        <div className="party-grid">
          {characters?.map((c) => (
            <CharacterCard
              key={c.id}
              portraitSrc={`${WIKI_BASE_URL}/static${c.portrait.replace(/^\.\//, '/')}`}
              name={c.name}
              role={pickLangValue(lang, c.role, c.role_en)}
              blurb={pickLangValue(lang, c.blurb, c.blurb_en)}
              readMoreLabel={t(strings, 'char_read_more')}
              href={wikiUrl(lang, c.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
