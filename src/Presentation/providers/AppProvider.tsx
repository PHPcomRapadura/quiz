import 'reflect-metadata'
import { container } from 'tsyringe'

import React, { useState } from 'react'
import { AppContext } from '../components/app/AppContext'
import { AppContextType, User } from '../types'
import { AuthService } from '../../Application/AuthService.ts'

export function AppProvider ({ children }: { children: React.ReactNode }) {
  container.register('AuthService', { useClass: AuthService })

  const [user, setUser] = useState<User>(null)

  const signIn = async (username: string, password: string): Promise<User> => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username, password })
    }
    const response = await fetch('http://127.0.0.1:3333/login', config)
    const data = await response.json()
    if (!data.token) {
      setUser(null)
      return null
    }
    sessionStorage.setItem('token', data.token)
    const abilities = data.abilities
    const user = { username, abilities }
    setUser(user)
    return user
  }

  const signOut = async (): Promise<boolean> => {
    setUser(null)
    sessionStorage.removeItem('token')
    return Promise.resolve(true)
  }

  const value: AppContextType = { container, user, signIn, signOut }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
