import type { FavoriteMovie } from './types'

const storageKey = 'favorite-movies'

export const readFavoritesFromStorage = (): FavoriteMovie[] => {
  const rawValue = localStorage.getItem(storageKey)
  if (!rawValue) {
    return []
  }

  try {
    const parsedValue = JSON.parse(rawValue) as FavoriteMovie[]
    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue
  } catch {
    return []
  }
}

export const writeFavoritesToStorage = (favorites: FavoriteMovie[]) => {
  localStorage.setItem(storageKey, JSON.stringify(favorites))
}
