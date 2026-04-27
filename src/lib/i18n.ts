/**
 * i18n helpers. Strings live in i18n.json (loaded via TanStack Query).
 * `t(strings, key)` looks up a key with SV fallback.
 * `tf(strings, key, n)` does the {n} substitution used by counters/templates.
 */
import type { I18nStrings, Lang } from './types'

export function pickLangValue<T>(lang: Lang, sv: T, en: T | undefined): T {
  return lang === 'en' && en !== undefined ? en : sv
}

export function t(strings: I18nStrings | undefined, key: string): string {
  if (!strings) return key
  return strings[key] ?? key
}

export function tf(strings: I18nStrings | undefined, key: string, n: number | string): string {
  return t(strings, key).replace('{n}', String(n))
}
