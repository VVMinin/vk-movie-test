import { NavLink } from 'react-router-dom'
import { routePaths } from '@/shared/config/routes'

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'nav-link nav-link--active' : 'nav-link'
}

export const Navigation = () => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to={routePaths.home} className={getLinkClassName} end>
          Фильмы
        </NavLink>
        <NavLink to={routePaths.favorites} className={getLinkClassName}>
          Избранное
        </NavLink>
        <NavLink to={routePaths.compare} className={getLinkClassName}>
          Сравнение
        </NavLink>
      </nav>
    </header>
  )
}
