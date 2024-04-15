import { useI18n } from '../../hooks'

export function DashboardGamesPage () {
  const $t = useI18n('pages.dashboard')
  return (
    <p>
      DashboardGamesPage: {$t('soon')}
    </p>
  )
}
