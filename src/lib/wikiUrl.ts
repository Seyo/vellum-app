/**
 * Build a URL into the Quartz wiki for a given language.
 * Mirrors the existing landing's `WIKI` variable pattern but as a typed helper.
 *
 *   wikiUrl('sv', 'NPC')                 → 'https://seyo.github.io/frostmaiden-campaign/NPC'
 *   wikiUrl('en', 'Karaktärer/Zahir')    → 'https://seyo.github.io/frostmaiden-campaign/en/Karaktärer/Zahir'
 */
import { WIKI_BASE_URL } from './api'
import type { Lang } from './types'

export function wikiUrl(lang: Lang, slug: string): string {
  const langPrefix = lang === 'en' ? '/en' : ''
  // slug is allowed to start with or without a leading slash; normalize.
  const path = slug.startsWith('/') ? slug : `/${slug}`
  return `${WIKI_BASE_URL}${langPrefix}${path}`
}

/**
 * Build a URL into one of the existing static Quartz pages (map.html, chat.html, etc.).
 * These live at /static/<file>.html in both SV and EN deploys.
 */
export function staticPageUrl(lang: Lang, file: string): string {
  const langPrefix = lang === 'en' ? '/en' : ''
  return `${WIKI_BASE_URL}${langPrefix}/static/${file}`
}
