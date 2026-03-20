import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovieById, type Movie } from '@/entities'
import { AddToFavoritesButton } from '@/features'
import { routePaths } from '@/shared/config/routes'
import { toApiError } from '@/shared/api/client'

const formatDate = (value: string | null) => {
  if (!value) {
    return '—'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('ru-RU').format(date)
}

export const MovieDetailsPage = () => {
  const params = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const movieId = Number(params.id)

    if (!Number.isFinite(movieId)) {
      setError('Неверный id фильма')
      setIsLoading(false)
      return
    }

    const fetchMovie = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getMovieById(movieId)
        setMovie(data)
      } catch (requestError) {
        const apiError = toApiError(requestError)
        setError(apiError.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [params.id])

  if (isLoading) {
    return (
      <>
        <h1 className="page-title">Детали фильма</h1>
        <p className="page-hint">Загружаем информацию...</p>
      </>
    )
  }

  if (error || !movie) {
    return (
      <>
        <h1 className="page-title">Детали фильма</h1>
        <p className="page-error">Не удалось загрузить фильм: {error ?? 'Не найден'}</p>
        <p>
          <Link to={routePaths.home}>Вернуться к списку</Link>
        </p>
      </>
    )
  }

  return (
    <section className="movie-details">
      {movie.posterUrl ? (
        <img src={movie.posterUrl} alt={movie.name} className="movie-details__poster" />
      ) : (
        <div className="movie-details__poster-placeholder">Нет постера</div>
      )}
      <div className="movie-details__content">
        <h1 className="page-title">{movie.name}</h1>
        <p className="movie-details__description">{movie.description ?? 'Описание отсутствует'}</p>
        <dl className="movie-details__meta">
          <div>
            <dt>Рейтинг</dt>
            <dd>{movie.rating ?? '—'}</dd>
          </div>
          <div>
            <dt>Дата выхода</dt>
            <dd>{formatDate(movie.releaseDate)}</dd>
          </div>
          <div>
            <dt>Жанры</dt>
            <dd>{movie.genres.length ? movie.genres.join(', ') : '—'}</dd>
          </div>
        </dl>
        <div className="movie-details__actions">
          <AddToFavoritesButton movie={movie} />
        </div>
        <p>
          <Link to={routePaths.home}>Назад к списку</Link>
        </p>
      </div>
    </section>
  )
}
