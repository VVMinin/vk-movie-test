import { useCallback, useEffect, useRef, useState } from 'react'
import { getMovies, MovieCard, type Movie } from '@/entities'
import { toApiError } from '@/shared/api/client'

const pageSize = 50

export const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(1)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null)
  const loadTriggerRef = useRef<HTMLDivElement | null>(null)
  const isRequestInFlightRef = useRef(false)

  const hasMore = page < pagesCount

  const loadPage = useCallback(
    async (nextPage: number) => {
      if (isRequestInFlightRef.current) {
        return
      }

      isRequestInFlightRef.current = true

      try {
        if (nextPage === 1) {
          setIsInitialLoading(true)
          setError(null)
        } else {
          setIsLoadingMore(true)
          setLoadMoreError(null)
        }

        const data = await getMovies({ page: nextPage, limit: pageSize })

        if (nextPage === 1) {
          setMovies(data.movies)
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.movies])
        }

        setPage(data.page)
        setPagesCount(data.pages)
      } catch (requestError) {
        const apiError = toApiError(requestError)

        if (nextPage === 1) {
          setError(apiError.message)
        } else {
          setLoadMoreError(apiError.message)
        }
      } finally {
        setIsInitialLoading(false)
        setIsLoadingMore(false)
        isRequestInFlightRef.current = false
      }
    },
    [],
  )

  useEffect(() => {
    loadPage(1)
  }, [loadPage])

  useEffect(() => {
    if (!loadTriggerRef.current || !hasMore) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (!firstEntry.isIntersecting || isRequestInFlightRef.current) {
          return
        }

        loadPage(page + 1)
      },
      {
        rootMargin: '300px 0px',
      },
    )

    observer.observe(loadTriggerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, loadPage, page])

  if (isInitialLoading) {
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
      {loadMoreError && <p className="page-error">Ошибка подгрузки: {loadMoreError}</p>}
      {hasMore && <div className="list-loader-trigger" ref={loadTriggerRef} />}
      {isLoadingMore && <p className="page-hint">Подгружаем еще фильмы...</p>}
    </>
  )
}
