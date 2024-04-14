import { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Driver, DriverType } from '../../../src/Domain/Contracts.ts'
import { isDevelopmentMode } from '../../../config/env.ts'

import { useApp } from '../../hooks/useApp.ts'
import { useFormValue } from '../../components/form/hooks/useFormValue.ts'
import { loadingStore } from '../../stores/loading.ts'
import { Case, If, Switch } from '../../components/general/Conditional.tsx'
import { FormSelect } from '../../components/form/FormSelect.tsx'
import { FormText } from '../../components/form/FormText.tsx'

export function DashboardSettingsPage () {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.dashboard.settings' }
  )
  const { session } = useApp()
  const [
    data,
    update,
    watch
  ] = useFormValue<Driver>(session.driver)
  const config = { url: '', authorization: '', anonKey: '' }
  watch('type', () => update('config', config))

  function save (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    loadingStore.state.loading = true
    window.setTimeout(
      () => loadingStore.state.loading = false,
      import.meta.env.VITE_IN_MEMORY_TIMEOUT
    )
  }

  return (
    <form
      className="DashboardForm"
      onSubmit={save}
    >
      <h4>{t('title')}</h4>
      <p className="mb-3">{t('description')}</p>
      <FormSelect
        name="type"
        label={t('fields.type.label')}
        description={t('fields.type.details')}
        value={data.type}
        update={update}
        options={[
          {
            value: DriverType.memory,
            label: t('fields.type.drivers.memory')
          },
          {
            value: DriverType.json,
            label: t('fields.type.drivers.json')
          },
          {
            value: DriverType.http,
            label: t('fields.type.drivers.http')
          },
          {
            value: DriverType.supabase,
            label: t('fields.type.drivers.supabase')
          },
        ]}
      />

      <div className="form-control">
        <p>{t('fields.config.label')}</p>

        <Switch condition={data.type}>

          <Case value={DriverType.json}>
            <FormText
              name="config.url"
              label={t('fields.config.drivers.json.url.label')}
              placeholder={t('fields.config.drivers.json.url.placeholder')}
              value={data.config.url}
              description={t('fields.config.drivers.json.url.details')}
              update={update}
            />
          </Case>

          <Case value={DriverType.http}>
            <FormText
              name="config.url"
              label={t('fields.config.drivers.http.url.label')}
              placeholder={t('fields.config.drivers.http.url.placeholder')}
              value={data.config.url}
              description={t('fields.config.drivers.http.url.details')}
              update={update}
            />
            <FormText
              name="config.authorization"
              label={t('fields.config.drivers.http.authorization.label')}
              placeholder={t('fields.config.drivers.http.authorization.placeholder')}
              value={data.config.authorization}
              description={t('fields.config.drivers.http.authorization.details')}
              update={update}
            />
          </Case>

          <Case value={DriverType.memory}>
            <p className="form-text text-muted">{t('fields.config.drivers.memory')}</p>
          </Case>

          <Case value={DriverType.supabase}>
            <FormText
              name="config.url"
              label={t('fields.config.drivers.supabase.url.label')}
              placeholder={t('fields.config.drivers.supabase.url.placeholder')}
              value={data.config.url}
              description={t('fields.config.drivers.supabase.url.details')}
              update={update}
            />
            <FormText
              name="config.anonKey"
              label={t('fields.config.drivers.supabase.anonKey.label')}
              placeholder={t('fields.config.drivers.supabase.anonKey.placeholder')}
              value={data.config.anonKey}
              description={t('fields.config.drivers.supabase.anonKey.details')}
              update={update}
            />
          </Case>
        </Switch>
      </div>
      <hr />
      <button
        type="submit"
        className="btn btn-primary"
      >
        {t('save')}
      </button>

      <If condition={isDevelopmentMode()}>
        <pre className="pt-2">{JSON.stringify(data, null, 2)}</pre>
      </If>
    </form>
  )
}
