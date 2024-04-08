import React, { useState } from 'react'

import { AppContext } from '../components/app/AppContext'
import { AppContextContract, Session } from '../types'
import { authManagerFactory } from './auth-manager-factory.ts'
import dependencies from '../../config/dependencies.ts'

export function AppProvider ({ children }: { children: React.ReactNode }) {
  const container = dependencies()

  const [session, setSession] = useState<Session>(null)

  const auth = authManagerFactory(setSession)

  const value: AppContextContract = { container, session, auth }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
