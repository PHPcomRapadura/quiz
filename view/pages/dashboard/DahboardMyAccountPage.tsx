import { useI18n } from '../../hooks'

export function DashboardMyAccountPage () {
  const $t = useI18n('pages.dashboard')
  return (
    <p>
      DashboardMyAccountPage: {$t('soon')}
    </p>
  )
}
