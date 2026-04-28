import { describe, it, expect, vi } from 'vitest'

vi.mock('./api', () => ({
  WIKI_BASE_URL: 'https://example.github.io/frostmaiden-campaign',
}))

const { processDesc } = await import('./processDesc')

describe('processDesc', () => {
  it('rewrites ../Slug hrefs to absolute Swedish wiki URLs', () => {
    const html = '<a href="../NPC/Nildar">Nildar</a>'
    expect(processDesc(html, 'sv')).toBe(
      '<a href="https://example.github.io/frostmaiden-campaign/NPC/Nildar">Nildar</a>',
    )
  })

  it('rewrites ../Slug hrefs to absolute English wiki URLs', () => {
    const html = '<a href="../NPC/Nildar">Nildar</a>'
    expect(processDesc(html, 'en')).toBe(
      '<a href="https://example.github.io/frostmaiden-campaign/en/NPC/Nildar">Nildar</a>',
    )
  })

  it('rewrites multiple links in one string', () => {
    const html =
      '<a href="../NPC/Nildar">Nildar</a> och <a href="../Platser/Caer-Konig">Caer Konig</a>'
    const result = processDesc(html, 'sv')
    expect(result).toContain('frostmaiden-campaign/NPC/Nildar')
    expect(result).toContain('frostmaiden-campaign/Platser/Caer-Konig')
  })

  it('leaves non-wiki hrefs unchanged', () => {
    const html = '<a href="https://external.com">extern länk</a>'
    expect(processDesc(html, 'sv')).toBe(html)
  })

  it('returns html unchanged when there are no links', () => {
    const html = '<em>Ingen länk</em>'
    expect(processDesc(html, 'sv')).toBe(html)
  })
})
