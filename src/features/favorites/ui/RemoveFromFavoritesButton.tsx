import { useFavorites } from '../model/use-favorites'

type Props = {
  movieId: number
}

export const RemoveFromFavoritesButton = ({ movieId }: Props) => {
  const { removeFromFavorites } = useFavorites()

  return (
    <button
      type="button"
      className="button"
      onClick={() => {
        removeFromFavorites(movieId)
      }}
    >
      Удалить
    </button>
  )
}
