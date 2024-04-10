import { useTranslation } from 'react-i18next'

export function DashboardPage () {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.dashboard' }
  )

  return (
    <p>
      {t('soon')}
    </p>
  )
}
