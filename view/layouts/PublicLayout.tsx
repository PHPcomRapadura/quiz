import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../hooks/useApp.ts'
import { Async, AsyncStatus, On } from '../components/general/Async.tsx'
import { loadingStore } from '../stores/loading.ts'
import { LayoutLoading } from './general/LayoutLoading.tsx'
import { LayoutNavbar } from './general/LayoutNavbar.tsx'

export function PublicLayout () {
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

            <LayoutNavbar
              session={session}
              auth={auth}
              layout="public"
            />

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
