import { Outlet } from 'react-router-dom'

import { useApp } from '../hooks/useApp.ts'
import { useI18n } from '../hooks/useI18n.ts'
import { loadingStore } from '../stores/loading.ts'
import { Async, AsyncStatus, On } from '../components/general/Async.tsx'

import { LayoutLoading } from './general/LayoutLoading.tsx'
import { LayoutNavbar } from './general/LayoutNavbar.tsx'

export function PublicLayout () {
  const $t = useI18n('layouts.public')

  const { session, auth } = useApp()

  return (
    <>
      <LayoutLoading label={$t('pending')}/>
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
                <small className="text-light-emphasis">{$t('copyright')}</small>
              </div>
            </footer>
          </div>
        </On>
      </Async>
    </>
  )
}
