import { useTranslation } from 'react-i18next'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
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
                    to="/games"
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
              <div className="card bg-secondary py-1 px-2">
                <ul
                  className="nav nav-tabs nav-fill"
                  role="tablist"
                >
                  <li
                    className="nav-item"
                    role="presentation"
                  >
                    <NavLink
                      className="nav-link"
                      role="tab"
                      to="/dashboard/games"
                    >
                      Meus Jogos
                    </NavLink>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                  >
                    <NavLink
                      className="nav-link"
                      role="tab"
                      to="/dashboard/my-account"
                    >
                      Minha Conta
                    </NavLink>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                  >
                    <NavLink
                      className="nav-link"
                      to="/dashboard/settings"
                      role="tab"
                    >
                      Configurações
                    </NavLink>
                  </li>
                </ul>
                <div className="py-2">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>
        </div>
      </On>
    </Async>
  )
}
