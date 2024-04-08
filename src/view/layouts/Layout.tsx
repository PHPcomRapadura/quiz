import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Layout () {
  const navigate = useNavigate()
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'layouts.root' }
  )
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
          >
            {t('brand')}
          </Link>

          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                to="/game"
                className="nav-link"
              >
                {t('play')}
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => navigate('/sign-in')}
          >
            {t('signIn')}
          </button>
        </div>
      </nav>

      <main className="flex-shrink-0">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer mt-auto p-2 bg-body-tertiary">
        <div className="container text-center">
          <small className="text-light-emphasis">{t('copyright')}</small>
        </div>
      </footer>
    </>
  )
}
