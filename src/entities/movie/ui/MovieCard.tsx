import { Link } from 'react-router-dom'
import { getMovieDetailsPath } from '@/shared/config/routes'
import type { Movie } from '../model/types'

type Props = {
  movie: Movie
}

export const MovieCard = ({ movie }: Props) => {
  return (
    <article className="movie-card">
      <Link to={getMovieDetailsPath(movie.id)} className="movie-card__poster-link">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.name} className="movie-card__poster" />
        ) : (
          <div className="movie-card__poster-placeholder">Нет постера</div>
        )}
      </Link>

      <div className="movie-card__content">
        <h3 className="movie-card__title">
          <Link to={getMovieDetailsPath(movie.id)}>{movie.name}</Link>
        </h3>
        <div className="movie-card__meta">
          <span>{movie.year ?? '—'}</span>
          <span>Рейтинг: {movie.rating ?? '—'}</span>
        </div>
      </div>
    </article>
  )
}
