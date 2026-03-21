import { AppRouter } from './providers/router'
import { CompareProvider, FavoritesProvider } from '@/features'

export const App = () => {
  return (
    <FavoritesProvider>
      <CompareProvider>
        <AppRouter />
      </CompareProvider>
    </FavoritesProvider>
  )
}
