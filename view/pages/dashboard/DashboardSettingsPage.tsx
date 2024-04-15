import { useState } from 'react'

import { Content, Driver, DriverType } from '../../../src/Domain/Contracts.ts'
import UserConfigRepository from '../../../src/Domain/Admin/UserConfigRepository.ts'

import { Form, FormSelect, FormText, useFormValue } from '../../components/form'
import { Case, Switch } from '../../components/general'
import { useApp, useI18n } from '../../hooks'

export function DashboardSettingsPage () {
  const $t = useI18n('pages.dashboard.settings')
  const { container, session } = useApp()
  const [error, setError] = useState<string>('')

  const userConfigRepository = container.resolve<UserConfigRepository>('UserConfigRepository')
  const {
    value,
    update,
    watch,
    reset,
  } = useFormValue<Driver>(session.driver)
  const config = { url: '', authorization: '', anonKey: '' }
  watch('type', () => update('config', config))

  function action (): Promise<Content> {
    setError('')
    if (!session.id) {
      return Promise.reject(new Error('No session id found'))
    }
    return userConfigRepository.update(session.id, value)
  }

  function onResolve (data: Content) {
    console.log(data)
  }

  function onReject (error: unknown) {
    setError($t('error'))
    console.error(error)
  }

  return (
    <div className="DashboardSettingsForm">
      <h4>{$t('title')}</h4>
      <p className="mb-3">{$t('description')}</p>
      <Form<Content>
        action={action}
        onResolve={onResolve}
        onReject={onReject}
        error={error}
        fields={<>
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
          {/* config */}
          <div className="form-control">
            <p>{$t('fields.config.label')}</p>

            <Switch condition={value.type}>
              {/* DriverType.json */}
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
              {/* DriverType.http */}
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
              {/* DriverType.memory */}
              <Case value={DriverType.memory}>
                <p className="form-text text-muted">{$t('fields.config.drivers.memory')}</p>
              </Case>
              {/* DriverType.supabase */}
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
        </>}
        buttons={(loading: boolean) => {
          return <>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              {$t('save')}
            </button>
            <button
              type="reset"
              className="btn btn-outline-light"
              onClick={reset}
            >
              {$t('reset')}
            </button>
          </>
        }}
      />
    </div>
  )
}
