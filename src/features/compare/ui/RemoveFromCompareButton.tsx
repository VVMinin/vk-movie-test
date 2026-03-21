import { useCompare } from '../model/use-compare'

type Props = {
  movieId: number
}

export const RemoveFromCompareButton = ({ movieId }: Props) => {
  const { removeFromCompare } = useCompare()

  return (
    <button
      type="button"
      className="button"
      onClick={() => {
        removeFromCompare(movieId)
      }}
    >
      Убрать
    </button>
  )
}
