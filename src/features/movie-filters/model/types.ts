export type MovieFilters = {
  genres: string[]
  ratingFrom: number
  ratingTo: number
  yearFrom: number
}

export const defaultMovieFilters: MovieFilters = {
  genres: [],
  ratingFrom: 1,
  ratingTo: 10,
  yearFrom: 1990,
}
