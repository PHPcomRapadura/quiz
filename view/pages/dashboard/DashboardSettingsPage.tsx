import { useState } from 'react'

import { Driver, DriverType } from '../../../src/Domain/Contracts.ts'

import { useFormValue } from '../../components/form/hooks/useFormValue.ts'
import { Case, Switch } from '../../components/general/Conditional.tsx'
import { Form } from '../../components/form/Form.tsx'
import { FormSelect } from '../../components/form/FormSelect.tsx'
import { FormText } from '../../components/form/FormText.tsx'
import { useApp } from '../../hooks/useApp.ts'
import { useI18n } from '../../hooks/useI18n.ts'
import { useLoading } from '../../hooks/useLoading.ts'

export function DashboardSettingsPage () {
  const $t = useI18n('pages.dashboard.settings')
  const { session } = useApp()
  const [error, setError] = useState('')
  const { loading } = useLoading()

  const [
    value,
    update,
    watch
  ] = useFormValue<Driver>(session.driver)
  const config = { url: '', authorization: '', anonKey: '' }
  watch('type', () => update('config', config))

  function action (data: Driver): Promise<unknown> {
    setError('')
    console.log(data)
    return new Promise((resolve) => {
      window.setTimeout(
        () => resolve('nuhh'),
        import.meta.env.VITE_IN_MEMORY_TIMEOUT
      )
    })
  }

  function onResolve (data: unknown) {
    console.log(data)
  }

  return (
    <Form<Driver, unknown>
      value={value}
      action={action}
      onResolve={onResolve}
      onReject={() => setError($t('error'))}
      error={error}
    >
      <h4>{$t('title')}</h4>
      <p className="mb-3">{$t('description')}</p>
      <FormSelect
        name="type"
        value={value.type}
        update={update}
        label={$t('fields.type.label')}
        description={$t('fields.type.details')}
        options={[
          {
            value: DriverType.memory,
            label: $t('fields.type.drivers.memory')
          },
          {
            value: DriverType.json,
            label: $t('fields.type.drivers.json')
          },
          {
            value: DriverType.http,
            label: $t('fields.type.drivers.http')
          },
          {
            value: DriverType.supabase,
            label: $t('fields.type.drivers.supabase')
          },
        ]}
      />

      <div className="form-control">
        <p>{$t('fields.config.label')}</p>

        <Switch condition={value.type}>

          <Case value={DriverType.json}>
            <FormText
              name="config.url"
              value={value.config.url}
              update={update}
              label={$t('fields.config.drivers.json.url.label')}
              placeholder={$t('fields.config.drivers.json.url.placeholder')}
              description={$t('fields.config.drivers.json.url.details')}
            />
          </Case>

          <Case value={DriverType.http}>
            <FormText
              name="config.url"
              value={value.config.url}
              update={update}
              label={$t('fields.config.drivers.http.url.label')}
              placeholder={$t('fields.config.drivers.http.url.placeholder')}
              description={$t('fields.config.drivers.http.url.details')}
            />
            <FormText
              name="config.authorization"
              value={value.config.authorization}
              update={update}
              label={$t('fields.config.drivers.http.authorization.label')}
              placeholder={$t('fields.config.drivers.http.authorization.placeholder')}
              description={$t('fields.config.drivers.http.authorization.details')}
            />
          </Case>

          <Case value={DriverType.memory}>
            <p className="form-text text-muted">{$t('fields.config.drivers.memory')}</p>
          </Case>

          <Case value={DriverType.supabase}>
            <FormText
              name="config.url"
              value={value.config.url}
              update={update}
              label={$t('fields.config.drivers.supabase.url.label')}
              placeholder={$t('fields.config.drivers.supabase.url.placeholder')}
              description={$t('fields.config.drivers.supabase.url.details')}
            />
            <FormText
              name="config.anonKey"
              value={value.config.anonKey}
              update={update}
              label={$t('fields.config.drivers.supabase.anonKey.label')}
              placeholder={$t('fields.config.drivers.supabase.anonKey.placeholder')}
              description={$t('fields.config.drivers.supabase.anonKey.details')}
            />
          </Case>
        </Switch>
      </div>
      <hr />
      <div className="form-action align-right">
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary"
        >
          {$t('save')}
        </button>
      </div>
    </Form>
  )
}
