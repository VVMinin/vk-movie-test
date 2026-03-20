import { apiClient } from '@/shared/api/client'
import { mapMovieFromApi } from '../model/mappers'
import type { Movie, MoviesApiResponse } from '../model/types'

type GetMoviesParams = {
  page?: number
  limit?: number
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
}: GetMoviesParams = {}): Promise<GetMoviesResult> => {
  const { data } = await apiClient.get<MoviesApiResponse>('/movie', {
    params: {
      page,
      limit,
    },
  })

  return {
    movies: data.docs.map(mapMovieFromApi),
    page: data.page,
    pages: data.pages,
    total: data.total,
  }
}
