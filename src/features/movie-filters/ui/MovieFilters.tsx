import type { MovieFilters as MovieFiltersState } from '../model/types'

type Props = {
  value: MovieFiltersState
  genres: string[]
  onChange: (nextValue: MovieFiltersState) => void
}

export const MovieFilters = ({ value, genres, onChange }: Props) => {
  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      onChange({
        ...value,
        genres: [...value.genres, genre],
      })
      return
    }

    onChange({
      ...value,
      genres: value.genres.filter((item) => item !== genre),
    })
  }

  return (
    <section className="filters">
      <div className="filters__row">
        <span className="filters__label">Рейтинг</span>
        <div className="filters__range">
          <input
            type="number"
            min={1}
            max={10}
            value={value.ratingFrom}
            onChange={(event) => {
              onChange({
                ...value,
                ratingFrom: Number(event.target.value),
              })
            }}
          />
          <span>-</span>
          <input
            type="number"
            min={1}
            max={10}
            value={value.ratingTo}
            onChange={(event) => {
              onChange({
                ...value,
                ratingTo: Number(event.target.value),
              })
            }}
          />
        </div>
      </div>

      <div className="filters__row">
        <span className="filters__label">Год от</span>
        <input
          type="number"
          min={1990}
          max={new Date().getFullYear()}
          value={value.yearFrom}
          onChange={(event) => {
            onChange({
              ...value,
              yearFrom: Number(event.target.value),
            })
          }}
        />
      </div>

      <div className="filters__row filters__row--genres">
        <span className="filters__label">Жанры</span>
        <div className="filters__genres">
          {genres.map((genre) => (
            <label key={genre} className="filters__genre">
              <input
                type="checkbox"
                checked={value.genres.includes(genre)}
                onChange={(event) => handleGenreChange(genre, event.target.checked)}
              />
              <span>{genre}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}
