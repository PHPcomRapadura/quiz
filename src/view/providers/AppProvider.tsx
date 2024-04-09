import React, { useState } from 'react'

import { AppContext } from '../components/app/AppContext'
import { AppContextContract, Session } from '../contracts.ts'
import { authManagerFactory } from './auth-manager-factory.ts'
import dependencies from '../../config/dependencies.ts'

export function AppProvider ({ children }: { children: React.ReactNode }) {
  const container = dependencies()

  const [session, setSession] = useState<Session>(null)

  const updateAuthSession = (session: Session) => {
    if (session?.credential) {
      setSession(session)
    }
  }

  const auth = authManagerFactory(updateAuthSession)

  const value: AppContextContract = { container, session, auth }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
