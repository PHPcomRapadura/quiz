import { useTranslation } from 'react-i18next'

export function useI18n (path: string) {
  const { t } = useTranslation(
    'default',
    { keyPrefix: path }
  )
  return t
}
