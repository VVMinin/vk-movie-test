import { defaultMovieFilters, type MovieFilters } from './types'

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

const parseNumberParam = (searchParams: URLSearchParams, key: string) => {
  const rawValue = searchParams.get(key)
  if (rawValue === null || rawValue.trim() === '') {
    return null
  }

  const parsedValue = Number(rawValue)
  return Number.isFinite(parsedValue) ? parsedValue : null
}

export const parseFiltersFromSearchParams = (searchParams: URLSearchParams): MovieFilters => {
  const genres = searchParams.getAll('genre').filter(Boolean)
  const ratingFrom = parseNumberParam(searchParams, 'ratingFrom')
  const ratingTo = parseNumberParam(searchParams, 'ratingTo')
  const yearFrom = parseNumberParam(searchParams, 'yearFrom')

  return {
    genres,
    ratingFrom: ratingFrom !== null ? clamp(ratingFrom, 1, 10) : defaultMovieFilters.ratingFrom,
    ratingTo: ratingTo !== null ? clamp(ratingTo, 1, 10) : defaultMovieFilters.ratingTo,
    yearFrom: yearFrom !== null ? clamp(yearFrom, 1990, new Date().getFullYear()) : defaultMovieFilters.yearFrom,
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
