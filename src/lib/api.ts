/**
 * Raw fetchers for the JSON files exposed by frostmaiden-campaign.
 * Today these read static JSON; swapping to a real API is a one-liner here.
 */
import type {
  Character,
  I18nData,
  MapPin,
  Quest,
  StatusData,
  TimelineData,
  WikiSection,
} from './types'

// Where to fetch JSON from. Defaults to the public Pages site so production "just works"
// without env config; override in dev via .env.local with VITE_DATA_BASE_URL=http://localhost:8080/static/data
const DATA_BASE_URL =
  import.meta.env.VITE_DATA_BASE_URL ??
  'https://seyo.github.io/frostmaiden-campaign/static/data'

export const WIKI_BASE_URL =
  import.meta.env.VITE_WIKI_BASE_URL ??
  'https://seyo.github.io/frostmaiden-campaign'

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${DATA_BASE_URL}/${path}`)
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
  return res.json() as Promise<T>
}

export const fetchI18n         = () => fetchJson<I18nData>('i18n.json')
export const fetchMapPins      = () => fetchJson<MapPin[]>('map-pins.json')
export const fetchTimeline     = () => fetchJson<TimelineData>('timeline.json')
export const fetchQuests       = () => fetchJson<Quest[]>('quests.json')
export const fetchStatus       = () => fetchJson<StatusData>('status.json')
export const fetchCharacters   = () => fetchJson<Character[]>('characters.json')
export const fetchWikiSections = () => fetchJson<WikiSection[]>('wiki-sections.json')
