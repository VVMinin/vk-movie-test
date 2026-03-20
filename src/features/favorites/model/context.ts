import { createContext } from 'react'
import type { Movie } from '@/entities'
import type { FavoriteMovie } from './types'

export type FavoritesContextValue = {
  favorites: FavoriteMovie[]
  addToFavorites: (movie: Movie) => void
  removeFromFavorites: (id: number) => void
  isFavorite: (id: number) => boolean
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
