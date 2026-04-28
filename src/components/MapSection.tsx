import { MapCanvas } from './MapCanvas'
import { useI18n } from '@/lib/queries'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/types'

interface MapSectionProps {
  lang: Lang
}

/**
 * Map section — chapter heading + description + interactive MapCanvas + legend.
 */
export function MapSection({ lang }: MapSectionProps) {
  const { data: i18n } = useI18n()
  const strings = i18n?.[lang]

  return (
    <section id="karta" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-14">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-muted-foreground">
              {t(strings, 'map_chapter')}
            </div>
            <h2 className="section-h2">
              {t(strings, 'map_heading')}
            </h2>
          </div>
          <p className="m-0 max-w-[44ch] text-[1.05rem] text-muted-foreground">
            {t(strings, 'map_desc')}
          </p>
        </div>

        <MapCanvas lang={lang} />
      </div>
    </section>
  )
}
