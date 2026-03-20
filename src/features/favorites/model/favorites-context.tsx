import { useMemo, useState, type ReactNode } from 'react'
import type { Movie } from '@/entities'
import type { FavoriteMovie } from './types'
import { readFavoritesFromStorage, writeFavoritesToStorage } from './storage'
import { FavoritesContext, type FavoritesContextValue } from './context'

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => readFavoritesFromStorage())

  const addToFavorites = (movie: Movie) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((item) => item.id === movie.id)) {
        return prevFavorites
      }

      const nextFavorites = [...prevFavorites, movie]
      writeFavoritesToStorage(nextFavorites)
      return nextFavorites
    })
  }

  const removeFromFavorites = (id: number) => {
    setFavorites((prevFavorites) => {
      const nextFavorites = prevFavorites.filter((item) => item.id !== id)
      writeFavoritesToStorage(nextFavorites)
      return nextFavorites
    })
  }

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite: (id: number) => favorites.some((movie) => movie.id === id),
    }),
    [favorites],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
