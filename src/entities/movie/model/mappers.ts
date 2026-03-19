import type { Movie, MovieApiDto } from './types'

const roundRating = (value: number | null) => {
  if (typeof value !== 'number') {
    return null
  }

  return Math.round(value * 10) / 10
}

export const mapMovieFromApi = (dto: MovieApiDto): Movie => {
  return {
    id: dto.id,
    name: dto.name || dto.alternativeName || 'Без названия',
    year: dto.year,
    rating: roundRating(dto.rating?.kp ?? null),
    posterUrl: dto.poster?.previewUrl || dto.poster?.url || null,
    description: dto.description || dto.shortDescription || null,
    releaseDate: dto.premiered,
    genres: dto.genres?.map((genre) => genre.name) ?? [],
    duration: dto.movieLength,
  }
}
