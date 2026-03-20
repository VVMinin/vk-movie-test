import { MovieCard } from '@/entities'
import { RemoveFromFavoritesButton, useFavorites } from '@/features'

export const FavoritesPage = () => {
  const { favorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <>
        <h1 className="page-title">Избранные фильмы</h1>
        <p className="page-hint">Вы пока ничего не добавили</p>
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">Избранные фильмы</h1>
      <section className="movies-grid">
        {favorites.map((movie) => (
          <div key={movie.id} className="movie-tile">
            <MovieCard movie={movie} />
            <div className="movie-tile__actions">
              <RemoveFromFavoritesButton movieId={movie.id} />
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
