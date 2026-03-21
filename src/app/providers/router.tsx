import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/app/layouts/MainLayout'
import { routePaths } from '@/shared/config/routes'
import { MoviesListPage } from '@/pages/movies-list'
import { MovieDetailsPage } from '@/pages/movie-details'
import { FavoritesPage } from '@/pages/favorites'
import { ComparePage } from '@/pages/compare'

export const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routePaths.home} element={<MoviesListPage />} />
          <Route path={routePaths.movieDetails} element={<MovieDetailsPage />} />
          <Route path={routePaths.favorites} element={<FavoritesPage />} />
          <Route path={routePaths.compare} element={<ComparePage />} />
        </Route>
        <Route path="*" element={<Navigate to={routePaths.home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
