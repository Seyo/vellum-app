import { describe, it, expect } from 'vitest'
import { t, tf, pickLangValue } from './i18n'
import type { I18nStrings } from './types'

const strings: I18nStrings = {
  hello: 'Hej',
  count: '{n} saker',
}

describe('t', () => {
  it('returns the value for a known key', () => {
    expect(t(strings, 'hello')).toBe('Hej')
  })

  it('returns the key itself when strings is undefined', () => {
    expect(t(undefined, 'hello')).toBe('hello')
  })

  it('returns the key itself when the key is missing', () => {
    expect(t(strings, 'missing_key')).toBe('missing_key')
  })
})

describe('tf', () => {
  it('substitutes {n} with the given number', () => {
    expect(tf(strings, 'count', 3)).toBe('3 saker')
  })

  it('substitutes {n} with a string value', () => {
    expect(tf(strings, 'count', 'många')).toBe('många saker')
  })

  it('falls back to key when strings is undefined', () => {
    expect(tf(undefined, 'count', 5)).toBe('count')
  })
})

describe('pickLangValue', () => {
  it('returns sv value when lang is sv', () => {
    expect(pickLangValue('sv', 'Hej', 'Hello')).toBe('Hej')
  })

  it('returns en value when lang is en and en is defined', () => {
    expect(pickLangValue('en', 'Hej', 'Hello')).toBe('Hello')
  })

  it('returns sv value when lang is en but en is undefined', () => {
    expect(pickLangValue('en', 'Hej', undefined)).toBe('Hej')
  })
})
