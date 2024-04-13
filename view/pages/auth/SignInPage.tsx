import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../hooks/useApp.ts'
import { AlertDanger } from '../../components/general/Alert.tsx'
import { Loading } from '../../components/general/Loading.tsx'
import { DriverType } from '../../../src/Domain/Contracts.ts'
import { isDevelopmentMode } from '../../../config/env.ts'
import { loadingStore } from '../../stores/loading.ts'

export function SignInPage () {
  const { auth, session } = useApp()
  const navigate = useNavigate()

  const [error, setError] = useState('')

  const type = session.driver.type === DriverType.supabase ? 'otp' : 'password'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    loadingStore.state.loading = true
    const form = new FormData(event.currentTarget)
    const username = form.get('username') as string
    const password = form.get('password') as string
    try {
      const signed = await auth.signIn(username, type === 'password' ? password : null)
      if (signed?.credential) {
        navigate('/dashboard')
        return
      }
      navigate('/auth/otp')
    } catch (error) {
      setError('Usuário e/ou senha inválidos')
      return
    } finally {
      loadingStore.state.loading = false
    }
  }

  useEffect(() => {
    if (session.credential) {
      navigate('/dashboard')
      return
    }
  }, [session, navigate])

  return session.credential ?
    <Loading /> :
    <div className="SignInPage">
      <h4>Entrar</h4>

      <div className="card bg-secondary py-2 px-3 rounded">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="form-label mt-1"
            >
              Usuário
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              aria-describedby="username_help"
              placeholder="Informe seu usuário"
              defaultValue={isDevelopmentMode() ? 'root@phpcomrapadura.org' : ''}
            />
            <small
              id="username_help"
              className="form-text text-muted"
            >
              Utilize seu nome de usuário ou email
            </small>
          </div>

          {
            type === 'password' &&
            <div>
              <label
                htmlFor="password"
                className="form-label mt-2"
              >
                Senha
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Password"
                autoComplete="off"
                defaultValue={isDevelopmentMode() ? 'aq1sw2de3' : ''}
              />
            </div>
          }

          <div className="my-3">
            <button
              disabled={loadingStore.state.loading}
              type="submit"
              className="btn btn-primary"
            >
              Entrar
            </button>
          </div>
          {
            error && (
              <AlertDanger>
                <span className="text-light-emphasis">{error}</span>
              </AlertDanger>
            )
          }
        </form>
      </div>

    </div>
}
