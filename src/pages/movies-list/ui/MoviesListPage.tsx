import { useEffect, useState } from 'react'
import { getMovies, MovieCard, type Movie } from '@/entities'
import { toApiError } from '@/shared/api/client'

export const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchMovies = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getMovies()

        if (isMounted) {
          setMovies(data)
        }
      } catch (requestError) {
        if (isMounted) {
          const apiError = toApiError(requestError)
          setError(apiError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchMovies()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <>
        <h1 className="page-title">Список фильмов</h1>
        <p className="page-hint">Загружаем фильмы...</p>
      </>
    )
  }

  if (error) {
    return (
      <>
        <h1 className="page-title">Список фильмов</h1>
        <p className="page-error">Не удалось загрузить фильмы: {error}</p>
      </>
    )
  }

  if (movies.length === 0) {
    return (
      <>
        <h1 className="page-title">Список фильмов</h1>
        <p className="page-hint">По вашему запросу ничего не найдено</p>
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">Список фильмов</h1>
      <section className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </>
  )
}
