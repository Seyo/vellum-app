/**
 * Shapes of the JSON files served from frostmaiden-campaign/quartz/static/data/.
 * Source of truth for the schema lives in that repo; keep these in sync.
 */

export type Lang = 'sv' | 'en'

export type I18nStrings = Record<string, string>
export type I18nData = Record<Lang, I18nStrings>

export interface MapPin {
  id: string
  type: 'town' | 'mountain' | 'fortress' | 'faction' | 'event'
  name: string
  name_en?: string
  x: number
  y: number
  slug: string
  blurb: string
  blurb_en?: string
  label?: boolean
}

export interface TimelineSession {
  id: string
  label: string
  label_en: string
  slug: string
}

export interface TimelineEvent {
  session: string
  day: string
  type: 'social' | 'travel' | 'invest' | 'combat' | 'death'
  icon: string
  title: string
  title_en: string
  desc: string
  desc_en: string
}

export interface TimelineData {
  sessions: TimelineSession[]
  events: TimelineEvent[]
}

export interface Quest {
  id: string
  status: 'aktiv' | 'oklar' | 'klar' | 'misslyckad'
  title: string
  title_en: string
  slug: string | null
  desc: string
  desc_en: string
  meta: string
  meta_en: string
}

export interface StatusContent {
  quote: string
  attr: string
  questions: string[]
}

export interface StatusData {
  day: number
  sv: StatusContent
  en: StatusContent
}

export interface Character {
  id: string
  name: string
  role: string
  role_en?: string
  portrait: string
  blurb: string
  blurb_en?: string
  slug: string
}

export interface WikiSection {
  title: string
  title_en?: string
  subtitle: string
  subtitle_en?: string
  count: number
  slug: string
  items: string[]
}
