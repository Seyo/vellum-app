import { describe, it, expect, vi, beforeEach } from 'vitest'

// Override the module to use a stable base URL in tests.
vi.mock('./api', () => ({
  WIKI_BASE_URL: 'https://example.github.io/frostmaiden-campaign',
}))

// Import after mock so the module picks up the stub.
const { wikiUrl, staticPageUrl } = await import('./wikiUrl')

describe('wikiUrl', () => {
  it('builds a Swedish wiki URL without a lang prefix', () => {
    expect(wikiUrl('sv', 'NPC')).toBe(
      'https://example.github.io/frostmaiden-campaign/NPC',
    )
  })

  it('builds an English wiki URL with /en prefix', () => {
    expect(wikiUrl('en', 'NPC')).toBe(
      'https://example.github.io/frostmaiden-campaign/en/NPC',
    )
  })

  it('handles slugs that already start with a slash', () => {
    expect(wikiUrl('sv', '/Karaktärer/Zahir')).toBe(
      'https://example.github.io/frostmaiden-campaign/Karaktärer/Zahir',
    )
  })

  it('handles nested slugs', () => {
    expect(wikiUrl('en', 'Karaktärer/Zahir')).toBe(
      'https://example.github.io/frostmaiden-campaign/en/Karaktärer/Zahir',
    )
  })
})

describe('staticPageUrl', () => {
  it('builds a Swedish static page URL', () => {
    expect(staticPageUrl('sv', 'chat.html')).toBe(
      'https://example.github.io/frostmaiden-campaign/static/chat.html',
    )
  })

  it('builds an English static page URL', () => {
    expect(staticPageUrl('en', 'chat.html')).toBe(
      'https://example.github.io/frostmaiden-campaign/en/static/chat.html',
    )
  })
})
