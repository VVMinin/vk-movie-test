import { apiClient } from '@/shared/api/client'
import { mapMovieFromApi } from '../model/mappers'
import type { Movie, MoviesApiResponse } from '../model/types'

type MoviesQueryFilters = {
  genres: string[]
  ratingFrom: number
  ratingTo: number
  yearFrom: number
}

type GetMoviesParams = {
  page?: number
  limit?: number
  filters?: MoviesQueryFilters
}

export type GetMoviesResult = {
  movies: Movie[]
  page: number
  pages: number
  total: number
}

export const getMovies = async ({
  page = 1,
  limit = 50,
  filters,
}: GetMoviesParams = {}): Promise<GetMoviesResult> => {
  const params: Record<string, string | number | string[]> = {
    page,
    limit,
  }

  if (filters) {
    if (filters.genres.length > 0) {
      params['genres.name'] = filters.genres
    }

    params['rating.kp'] = `${filters.ratingFrom}-${filters.ratingTo}`
    params.year = `${filters.yearFrom}-${new Date().getFullYear()}`
  }

  const { data } = await apiClient.get<MoviesApiResponse>('/v1.4/movie', {
    params,
  })

  return {
    movies: data.docs.map(mapMovieFromApi),
    page: data.page,
    pages: data.pages,
    total: data.total,
  }
}
