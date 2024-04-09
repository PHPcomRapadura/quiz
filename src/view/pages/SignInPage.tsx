import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../hooks'
import { AlertDanger } from '../components/general/Alert.tsx'

export function SignInPage () {
  const app = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const username = form.get('username') as string
    const password = form.get('password') as string
    const signed = await app.auth.signIn(username, password)
    if (!signed) {
      setError('Usuário e/ou senha inválidos')
      return
    }
    navigate('/dashboard')
  }
  return <>
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
          />
          <small
            id="username_help"
            className="form-text text-muted"
          >
            Utilize seu nome de usuário ou email
          </small>
        </div>

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
          />
        </div>

        <div className="my-3">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Entrar
          </button>
        </div>
        {error && (
          <AlertDanger>
            <span className="text-light-emphasis">{error}</span>
          </AlertDanger>
        )}
      </form>
    </div>

  </>
}
