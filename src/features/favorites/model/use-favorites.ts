import { useContext } from 'react'
import { FavoritesContext } from './context'

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites should be used inside FavoritesProvider')
  }

  return context
}
