import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../hooks/useApp.ts'
import { Async, AsyncStatus, On } from '../components/general/Async.tsx'
import { loadingStore } from '../stores/loading.ts'
import { LayoutLoading } from './LayoutLoading.tsx'

export function PublicLayout () {
  const navigate = useNavigate()
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'layouts.public' }
  )

  const { session, auth } = useApp()

  return (
    <>
      <LayoutLoading label={t('pending')}/>
      <Async
        using={() => auth.restore()}
        onResolve={() => loadingStore.state.loading = false}
      >
        <On status={AsyncStatus.Resolved}>

          <div className="PublicLayout">
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
                        onClick={() => navigate('/dashboard')}
                      >
                        {t('myAccount')}
                      </button>
                    </> :
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate('/auth/sign-in')}
                    >
                      {t('signIn')}
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
    </>
  )
}
