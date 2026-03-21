import { RemoveFromCompareButton, useCompare } from '@/features'

export const ComparePage = () => {
  const { moviesToCompare, clearCompare } = useCompare()

  if (moviesToCompare.length === 0) {
    return (
      <>
        <h1 className="page-title">Сравнение фильмов</h1>
        <p className="page-hint">Добавьте фильмы в сравнение из карточек</p>
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">Сравнение фильмов</h1>
      <div className="compare-actions">
        <button type="button" className="button" onClick={clearCompare}>
          Очистить сравнение
        </button>
      </div>
      <div className="compare-table-wrapper">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Год</th>
              <th>Рейтинг</th>
              <th>Жанры</th>
              <th>Длительность</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {moviesToCompare.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>{movie.year ?? '—'}</td>
                <td>{movie.rating ?? '—'}</td>
                <td>{movie.genres.length ? movie.genres.join(', ') : '—'}</td>
                <td>{movie.duration ? `${movie.duration} мин` : '—'}</td>
                <td>
                  <RemoveFromCompareButton movieId={movie.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
