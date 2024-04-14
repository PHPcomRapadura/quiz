import { useI18n } from '../../hooks/useI18n.ts'

export function DashboardMyAccountPage () {
  const $t = useI18n('pages.dashboard')
  return (
    <p>
      DashboardMyAccountPage: {$t('soon')}
    </p>
  )
}
