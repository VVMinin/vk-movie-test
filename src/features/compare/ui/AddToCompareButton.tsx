import type { Movie } from '@/entities'
import { useCompare } from '../model/use-compare'

type Props = {
  movie: Movie
}

export const AddToCompareButton = ({ movie }: Props) => {
  const { addToCompare, isInCompare } = useCompare()
  const alreadyInCompare = isInCompare(movie.id)

  if (alreadyInCompare) {
    return <span className="compare-state">В сравнении</span>
  }

  return (
    <button
      type="button"
      className="button"
      onClick={() => {
        addToCompare(movie)
      }}
    >
      Сравнить
    </button>
  )
}
