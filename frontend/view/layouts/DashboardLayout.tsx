import { useApp, useI18n, useLoading, useRunOnce } from '../hooks'
import { Async, AsyncStatus, On } from '../components/general/Async.tsx'

import { DashboardNavigation } from './dashboard/DashboardNavigation.tsx'
import { LayoutLoading } from './general/LayoutLoading.tsx'
import { LayoutNavbar } from './general/LayoutNavbar.tsx'

export function DashboardLayout () {
  const $t = useI18n('layouts.dashboard')
  const { fall } = useLoading()
  const { session, auth } = useApp()

  useRunOnce(() => document.title = $t('brand'))

  return (
    <>
      <LayoutLoading label={$t('pending')} />
      <Async
        using={() => auth.restore()}
        onFinally={() => fall()}
      >
        <On status={AsyncStatus.Resolved}>

          <div className="DashboardLayout">

            <LayoutNavbar
              session={session}
              auth={auth}
              layout="dashboard"
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
