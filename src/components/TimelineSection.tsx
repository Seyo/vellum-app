import {
  TimelineEventCard,
  TimelineLegend,
  TimelineSessionHeader,
} from '@seyo/vellum-ds'
import { useI18n, useTimeline } from '@/lib/queries'
import { t, pickLangValue } from '@/lib/i18n'
import { wikiUrl } from '@/lib/wikiUrl'
import { processDesc } from '@/lib/processDesc'
import type { Lang } from '@/lib/types'

interface TimelineSectionProps {
  lang: Lang
}

const EVENT_TYPES = ['social', 'travel', 'invest', 'combat', 'death'] as const

/**
 * Vertical timeline section. Sessions are reversed (most recent first), and
 * events within each session are also reversed. Session header has a wiki link;
 * event descriptions are HTML and get their wiki links rewritten per lang.
 */
export function TimelineSection({ lang }: TimelineSectionProps) {
  const { data: i18n } = useI18n()
  const { data: timeline } = useTimeline()
  const strings = i18n?.[lang]

  if (!timeline) return null

  const groups: Record<string, typeof timeline.events> = {}
  for (const s of timeline.sessions) groups[s.id] = []
  for (const e of timeline.events) {
    if (groups[e.session]) groups[e.session].push(e)
  }

  const legendItems = EVENT_TYPES.map((type) => ({
    type,
    label: t(strings, `tl_${type}`),
  }))

  return (
    <section id="tidslinje" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-14">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-muted-foreground">
              {t(strings, 'timeline_chapter')}
            </div>
            <h2 className="section-h2">
              {t(strings, 'timeline_heading')}
            </h2>
          </div>
          <p className="m-0 max-w-[44ch] text-[1.05rem] text-muted-foreground">
            {t(strings, 'timeline_desc')}
          </p>
        </div>

        <TimelineLegend items={legendItems} />

        {/* Vertical guide line ::before drawn via .timeline-rail */}
        <div className="timeline-rail relative mx-auto max-w-[680px] pl-[52px]">
          {[...timeline.sessions].reverse().map((session) => {
            const evts = (groups[session.id] ?? []).slice().reverse()
            return (
              <div key={session.id}>
                <TimelineSessionHeader
                  label={pickLangValue(lang, session.label, session.label_en)}
                  href={wikiUrl(lang, session.slug)}
                />
                {evts.map((ev, i) => (
                  <TimelineEventCard
                    key={`${session.id}-${i}`}
                    type={ev.type}
                    day={ev.day}
                    icon={ev.icon}
                    title={pickLangValue(lang, ev.title, ev.title_en)}
                    description={processDesc(
                      pickLangValue(lang, ev.desc, ev.desc_en),
                      lang,
                    )}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
