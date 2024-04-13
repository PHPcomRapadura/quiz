import { useTranslation } from 'react-i18next'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp.ts'
import { Async, AsyncStatus, On } from '../components/general/Async.tsx'

export function DashboardLayout () {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'layouts.dashboard' }
  )
  const navigate = useNavigate()

  const { session, auth } = useApp()

  const signOut = async () => {
    const done = await auth.signOut()
    if (done) {
      navigate('/')
    }
  }

  return (
    <Async using={() => auth.restore()}>
      <On status={AsyncStatus.Resolved}>

        <div className="DashboardLayout">
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
                    to="/dashboard/my-account"
                    className="nav-link"
                  >
                    {t('play')}
                  </Link>
                </li>
              </ul>
              {
                session.credential ?
                  <>
                    <small className="text-light-emphasis px-2">{session.username}</small>
                    <button
                      className="btn btn-outline-primary"
                      onClick={signOut}
                    >
                      {t('signOut')}
                    </button>
                  </> :
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/games')}
                  >
                    {t('games')}
                  </button>
              }
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
        </div>
      </On>
    </Async>
  )
}
