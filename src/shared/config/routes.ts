export const routePaths = {
  home: '/',
  movieDetails: '/movie/:id',
  favorites: '/favorites',
  compare: '/compare',
}

export const getMovieDetailsPath = (id: number) => `/movie/${id}`
