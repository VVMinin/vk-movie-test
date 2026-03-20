import { apiClient } from '@/shared/api/client'

type GenreItem = {
  name: string
}

export const getMovieGenres = async (): Promise<string[]> => {
  const { data } = await apiClient.get<GenreItem[]>('/v1/movie/possible-values-by-field', {
    params: {
      field: 'genres.name',
    },
  })

  return data.map((item) => item.name).filter(Boolean)
}
