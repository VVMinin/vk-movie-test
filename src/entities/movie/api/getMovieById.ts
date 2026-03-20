import { apiClient } from '@/shared/api/client'
import { mapMovieFromApi } from '../model/mappers'
import type { Movie, MovieApiDto } from '../model/types'

export const getMovieById = async (id: number): Promise<Movie> => {
  const { data } = await apiClient.get<MovieApiDto>(`/v1.4/movie/${id}`)
  return mapMovieFromApi(data)
}
