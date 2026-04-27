/**
 * TanStack Query hooks. Static JSON today, real API later — the call sites stay the same.
 */
import { useQuery } from '@tanstack/react-query'
import {
  fetchCharacters,
  fetchI18n,
  fetchMapPins,
  fetchQuests,
  fetchStatus,
  fetchTimeline,
  fetchWikiSections,
} from './api'

// Static JSON rarely changes during a session, so cache aggressively.
const STATIC = {
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
}

export const useI18n         = () => useQuery({ queryKey: ['i18n'],         queryFn: fetchI18n,         ...STATIC })
export const useMapPins      = () => useQuery({ queryKey: ['mapPins'],      queryFn: fetchMapPins,      ...STATIC })
export const useTimeline     = () => useQuery({ queryKey: ['timeline'],     queryFn: fetchTimeline,     ...STATIC })
export const useQuests       = () => useQuery({ queryKey: ['quests'],       queryFn: fetchQuests,       ...STATIC })
export const useStatus       = () => useQuery({ queryKey: ['status'],       queryFn: fetchStatus,       ...STATIC })
export const useCharacters   = () => useQuery({ queryKey: ['characters'],   queryFn: fetchCharacters,   ...STATIC })
export const useWikiSections = () => useQuery({ queryKey: ['wikiSections'], queryFn: fetchWikiSections, ...STATIC })
