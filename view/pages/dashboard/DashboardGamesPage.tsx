import { useI18n } from '../../hooks/useI18n.ts'

export function DashboardGamesPage () {
  const $t = useI18n('pages.dashboard')
  return (
    <p>
      DashboardGamesPage: {$t('soon')}
    </p>
  )
}
