import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { isDevelopmentMode } from '../../../../config/env.ts'
import { Session } from '../../../../src/Domain/Auth/Auth.ts'
import { DriverType } from '../../../../src/Domain/Contracts.ts'

import { Form, FormPassword, FormText, useFormValue } from '../../../components/form'
import { If } from '../../../components/general/Conditional.tsx'
import { useApp, useI18n, useLoading } from '../../../hooks'

type SignInData = {
  username: string
  password: string | null
}

export function SignInPage () {
  const $t = useI18n('pages.auth.signIn')
  const { auth, session } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { loading } = useLoading()

  const type = session.driver.type === DriverType.supabase ? 'otp' : 'password'
  const initial = {
    username: isDevelopmentMode() ? 'arretado@phpcomrapadura.org' : '',
    password: isDevelopmentMode() ? '***************' : ''
  }
  const {
    value,
    update
  } = useFormValue<SignInData>(initial)

  function action (): Promise<Session> {
    setError('')
    if (type === 'password') {
      return auth.signIn(value.username, value.password)
    }
    return auth.signIn(value.username)
  }

  function onResolve (data: Session) {
    if (data?.credential) {
      navigate('/dashboard')
      return
    }
    navigate('/auth/otp')
  }

  return (
    <div
      className="SignInPage"
      style={{ maxWidth: '520px', margin: '0 auto' }}
    >
      <h4>{$t('title')}</h4>
      <div className="card bg-secondary responsive-padding rounded">
        <Form<Session>
          action={action}
          onResolve={onResolve}
          onReject={() => setError($t('error'))}
          error={error}
          fields={
            <>
              <FormText
                name="username"
                value={value.username}
                update={update}
                label={$t('fields.username.label')}
                placeholder={$t('fields.username.placeholder')}
                description={$t('fields.username.description')}
              />

              <If condition={type === 'password'}>
                <FormPassword
                  name="password"
                  value={value.password}
                  update={update}
                  label={$t('fields.password.label')}
                  placeholder={$t('fields.password.placeholder')}
                  description={$t('fields.password.description')}
                />
              </If>
            </>
          }
          buttons={
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary px-4"
            >
              {$t('action')}
            </button>
          }
        />
      </div>
    </div>
  )
}
