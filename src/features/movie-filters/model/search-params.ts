import { defaultMovieFilters, type MovieFilters } from './types'

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

export const parseFiltersFromSearchParams = (searchParams: URLSearchParams): MovieFilters => {
  const genres = searchParams.getAll('genre').filter(Boolean)
  const ratingFrom = Number(searchParams.get('ratingFrom'))
  const ratingTo = Number(searchParams.get('ratingTo'))
  const yearFrom = Number(searchParams.get('yearFrom'))

  return {
    genres,
    ratingFrom: Number.isFinite(ratingFrom)
      ? clamp(ratingFrom, 1, 10)
      : defaultMovieFilters.ratingFrom,
    ratingTo: Number.isFinite(ratingTo) ? clamp(ratingTo, 1, 10) : defaultMovieFilters.ratingTo,
    yearFrom: Number.isFinite(yearFrom)
      ? clamp(yearFrom, 1990, new Date().getFullYear())
      : defaultMovieFilters.yearFrom,
  }
}

export const buildSearchParamsFromFilters = (filters: MovieFilters): URLSearchParams => {
  const params = new URLSearchParams()

  filters.genres.forEach((genre) => {
    params.append('genre', genre)
  })

  if (filters.ratingFrom !== defaultMovieFilters.ratingFrom) {
    params.set('ratingFrom', String(filters.ratingFrom))
  }

  if (filters.ratingTo !== defaultMovieFilters.ratingTo) {
    params.set('ratingTo', String(filters.ratingTo))
  }

  if (filters.yearFrom !== defaultMovieFilters.yearFrom) {
    params.set('yearFrom', String(filters.yearFrom))
  }

  return params
}
