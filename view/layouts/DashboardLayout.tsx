import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp.ts'
import { Async, AsyncStatus, On } from '../components/general/Async.tsx'
import { Case } from '../components/general/Conditional.tsx'
import { loadingStore } from '../stores/loading.ts'
import { LayoutLoading } from './LayoutLoading.tsx'
import { LayoutNavbar } from './LayoutNavbar.tsx'
import { DashboardNavigation } from './dashboard/DashboardNavigation.tsx'

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
    <>
      <LayoutLoading label={t('pending')} />
      <Async
        using={() => auth.restore()}
        onFinally={() => loadingStore.state.loading = false}
      >
        <On status={AsyncStatus.Resolved}>

          <div className="DashboardLayout">
            <LayoutNavbar condition={!!session.credential}>
              <Case value={true}>
                <small className="text-light-emphasis px-2">{session.username}</small>
                <button
                  className="btn btn-outline-primary"
                  onClick={signOut}
                >
                  {t('signOut')}
                </button>
              </Case>
              <Case value={false}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/games')}
                >
                  {t('games')}
                </button>
              </Case>
            </LayoutNavbar>

            <main className="flex-shrink-0">
              <div className="container">
                <DashboardNavigation />
              </div>
            </main>
          </div>
        </On>
      </Async>
    </>
  )
}
