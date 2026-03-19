import { apiClient } from '@/shared/api/client'
import { mapMovieFromApi } from '../model/mappers'
import type { Movie, MoviesApiResponse } from '../model/types'

type GetMoviesParams = {
  page?: number
  limit?: number
}

export const getMovies = async ({
  page = 1,
  limit = 50,
}: GetMoviesParams = {}): Promise<Movie[]> => {
  const { data } = await apiClient.get<MoviesApiResponse>('/movie', {
    params: {
      page,
      limit,
    },
  })

  return data.docs.map(mapMovieFromApi)
}
