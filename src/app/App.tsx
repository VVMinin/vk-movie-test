import { AppRouter } from './providers/router'
import { CompareProvider, FavoritesProvider } from '@/features'
import { ThemeProvider } from './providers/theme'

export const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CompareProvider>
          <AppRouter />
        </CompareProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}
