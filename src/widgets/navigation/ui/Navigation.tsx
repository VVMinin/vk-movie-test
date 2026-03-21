import { NavLink } from 'react-router-dom'
import { routePaths } from '@/shared/config/routes'
import { useTheme } from '@/app/providers/theme'

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'nav-link nav-link--active' : 'nav-link'
}

export const Navigation = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header__row">
        <div className="brand">
          <span className="brand__logo">VK MOVIE</span>
          <span className="brand__caption">онлайн каталог</span>
        </div>
        <button type="button" className="button theme-switcher" onClick={toggleTheme}>
          {theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
        </button>
      </div>
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
