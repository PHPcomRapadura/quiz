import { ReactNode, useState } from 'react'

import { AppContextContract, Session } from '../contracts.ts'

import dependencies from '../../config/dependencies.ts'

import { getInitialSession, sessionStore } from '../stores/session.ts'
import { AppContext } from '../components/app/AppContext'
import { authManagerFactory } from './auth-manager-factory.ts'

export function AppProvider ({ children }: { children: ReactNode }) {
  const container = dependencies()

  const [session, setSession] = useState<Session>(getInitialSession())

  const updateAuthSession = (session: Session) => {
    setSession(session)
    sessionStore.state.username = session.username
    sessionStore.state.driver = session.driver
    sessionStore.state.credential = session.credential
    sessionStore.state.abilities = session.abilities
  }

  const context = sessionStore.state.credential
  const auth = authManagerFactory(updateAuthSession, context)

  const value: AppContextContract = { container, session, auth }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
