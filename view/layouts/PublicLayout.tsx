import { Outlet } from 'react-router-dom'

import { Async, AsyncStatus, On } from '../components/general/Async.tsx'
import { useApp, useI18n, useLoading, useRunOnce } from '../hooks'

import { LayoutLoading } from './general/LayoutLoading.tsx'
import { LayoutNavbar } from './general/LayoutNavbar.tsx'

export function PublicLayout () {
  const $t = useI18n('layouts.public')
  const { fall } = useLoading()
  const { session, auth } = useApp()

  useRunOnce(() => document.title = $t('brand'))

  return (
    <>
      <LayoutLoading label={$t('pending')}/>
      <Async
        using={() => auth.restore()}
        onFinally={() => fall()}
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
