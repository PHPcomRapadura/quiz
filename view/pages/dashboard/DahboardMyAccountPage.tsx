import { useTranslation } from 'react-i18next'

export function DashboardMyAccountPage () {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.dashboard' }
  )
  return (
    <p>
      DashboardMyAccountPage: {t('soon')}
    </p>
  )
}
