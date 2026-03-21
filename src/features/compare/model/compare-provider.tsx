import { useMemo, useState, type ReactNode } from 'react'
import type { Movie } from '@/entities'
import { CompareContext, type CompareContextValue } from './context'

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [moviesToCompare, setMoviesToCompare] = useState<Movie[]>([])

  const addToCompare = (movie: Movie) => {
    setMoviesToCompare((prevMovies) => {
      if (prevMovies.some((item) => item.id === movie.id)) {
        return prevMovies
      }

      if (prevMovies.length < 2) {
        return [...prevMovies, movie]
      }

      return [prevMovies[1], movie]
    })
  }

  const removeFromCompare = (id: number) => {
    setMoviesToCompare((prevMovies) => prevMovies.filter((movie) => movie.id !== id))
  }

  const clearCompare = () => {
    setMoviesToCompare([])
  }

  const value = useMemo<CompareContextValue>(
    () => ({
      moviesToCompare,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare: (id: number) => moviesToCompare.some((movie) => movie.id === id),
    }),
    [moviesToCompare],
  )

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}
