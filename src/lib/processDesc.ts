import { wikiUrl } from './wikiUrl'
import type { Lang } from './types'

/**
 * Rewrite wiki links inside HTML description strings for the active language.
 *
 * timeline.json descriptions use relative `../Foo` hrefs so existing Quartz
 * pages resolve them correctly. The React app needs absolute URLs into the
 * right Quartz wiki, so we rewrite `href="../Foo"` → wikiUrl(lang, "Foo").
 */
export function processDesc(html: string, lang: Lang): string {
  return html.replace(/href="\.\.\/([^"]+)"/g, (_match, slug: string) => {
    return `href="${wikiUrl(lang, slug)}"`
  })
}
