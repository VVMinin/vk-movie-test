import { Outlet } from 'react-router-dom'
import { Navigation } from '@/widgets/navigation'

export const MainLayout = () => {
  return (
    <div className="layout">
      <Navigation />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}
