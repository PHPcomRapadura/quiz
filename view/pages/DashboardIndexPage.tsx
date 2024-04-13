import { useTranslation } from 'react-i18next'

export function DashboardIndexPage () {
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
