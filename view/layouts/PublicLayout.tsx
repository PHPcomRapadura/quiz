import { Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../hooks/useApp.ts'
import { Async, AsyncStatus, On } from '../components/general/Async.tsx'
import { loadingStore } from '../stores/loading.ts'
import { LayoutLoading } from './LayoutLoading.tsx'
import { Case } from '../components/general/Conditional.tsx'
import { LayoutNavbar } from './LayoutNavbar.tsx'

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
        onFinally={() => loadingStore.state.loading = false}
      >
        <On status={AsyncStatus.Resolved}>

          <div className="PublicLayout">

            <LayoutNavbar condition={!!session.credential}>
              <Case value={true}>
                <small className="text-light-emphasis px-2">{session.username}</small>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  {t('myAccount')}
                </button>
              </Case>
              <Case value={false}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/auth/sign-in')}
                >
                  {t('signIn')}
                </button>
              </Case>
            </LayoutNavbar>

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
