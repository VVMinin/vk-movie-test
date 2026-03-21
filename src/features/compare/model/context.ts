import { createContext } from 'react'
import type { Movie } from '@/entities'

export type CompareContextValue = {
  moviesToCompare: Movie[]
  addToCompare: (movie: Movie) => void
  removeFromCompare: (id: number) => void
  clearCompare: () => void
  isInCompare: (id: number) => boolean
}

export const CompareContext = createContext<CompareContextValue | null>(null)
