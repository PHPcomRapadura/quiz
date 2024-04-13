import { useTranslation } from 'react-i18next'
import { useApp } from '../hooks/useApp.ts'
import { Async, AsyncStatus, On } from '../components/general/Async.tsx'
import { loadingStore } from '../stores/loading.ts'
import { LayoutLoading } from './general/LayoutLoading.tsx'
import { LayoutNavbar } from './general/LayoutNavbar.tsx'
import { DashboardNavigation } from './dashboard/DashboardNavigation.tsx'

export function DashboardLayout () {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'layouts.dashboard' }
  )

  const { session, auth } = useApp()

  return (
    <>
      <LayoutLoading label={t('pending')} />
      <Async
        using={() => auth.restore()}
        onFinally={() => loadingStore.state.loading = false}
      >
        <On status={AsyncStatus.Resolved}>

          <div className="DashboardLayout">

            <LayoutNavbar
              session={session}
              auth={auth}
              layout="public"
            />

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
