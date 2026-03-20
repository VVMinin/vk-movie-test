import { AppRouter } from './providers/router'
import { FavoritesProvider } from '@/features'

export const App = () => {
  return (
    <FavoritesProvider>
      <AppRouter />
    </FavoritesProvider>
  )
}
