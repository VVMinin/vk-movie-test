export type Movie = {
  id: number
  name: string
  year: number | null
  rating: number | null
  posterUrl: string | null
  description: string | null
  releaseDate: string | null
  genres: string[]
  duration: number | null
}

export type MovieApiDto = {
  id: number
  name: string | null
  alternativeName: string | null
  year: number | null
  rating: {
    kp: number | null
  } | null
  poster: {
    previewUrl: string | null
    url: string | null
  } | null
  description: string | null
  shortDescription: string | null
  premiered: string | null
  genres: Array<{ name: string }>
  movieLength: number | null
}

export type MoviesApiResponse = {
  docs: MovieApiDto[]
  limit: number
  page: number
  pages: number
  total: number
}
