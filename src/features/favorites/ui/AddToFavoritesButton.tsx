import { useState } from 'react'
import type { Movie } from '@/entities'
import { useFavorites } from '../model/use-favorites'

type Props = {
  movie: Movie
}

export const AddToFavoritesButton = ({ movie }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToFavorites, isFavorite } = useFavorites()
  const isMovieInFavorites = isFavorite(movie.id)

  if (isMovieInFavorites) {
    return <span className="favorite-state">В избранном</span>
  }

  return (
    <>
      <button type="button" className="button" onClick={() => setIsModalOpen(true)}>
        В избранное
      </button>

      {isModalOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsModalOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <p className="modal__title">Добавить фильм в избранное?</p>
            <p className="modal__text">{movie.name}</p>
            <div className="modal__actions">
              <button type="button" className="button" onClick={() => setIsModalOpen(false)}>
                Отмена
              </button>
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  addToFavorites(movie)
                  setIsModalOpen(false)
                }}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
