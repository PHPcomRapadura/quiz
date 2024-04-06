import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../hooks'

export function LoginPage () {
    const app = useApp()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        const form = new FormData(event.currentTarget)
        const username = form.get('username') as string
        const password = form.get('password') as string
        const signed = await app.signIn(username, password)
        if (!signed) {
            setError('Usuário e/ou senha inválidos')
            return
        }
        navigate('/private')
    }
    return <>
    <p>Faça o login</p>
    <form onSubmit={handleSubmit}>
        <p>Digite seu nome de usuário:</p>
        <input type="text" name="username" />
        <p>Digite sua senha:</p>
        <input type="password" name="password"/>
        <hr />
        <button type="submit">Entrar </button>
        {error && (
            <div>{error}</div>
        )}
    </form>
    
    </>
}