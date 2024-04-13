import { useTranslation } from 'react-i18next'

export function DashboardGamesPage () {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.dashboard' }
  )
  return (
    <p>
      DashboardGamesPage: {t('soon')}
    </p>
  )
}
