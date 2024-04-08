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

      <main className="container">
        <div className="mt-5">
          <div className="pt-2">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}
