import { createStore, Store } from '../store.ts'

import { Credential, Session } from '../../src/Domain/Auth/Auth.ts'
import { Driver, DriverType } from '../../src/Domain/Contracts.ts'
import { credentialParser } from '../../src/Application/Auth'

const loadCredential = (): Credential => {
  const credential = window.sessionStorage.getItem('credential')
  return credential ? credentialParser(JSON.parse(credential)) : undefined
}

export const getInitialSession = (): Session => ({
  username: 'guest',
  credential: loadCredential(),
  abilities: [],
  driver: {
    type: DriverType.supabase,
    config: {
      url: import.meta.env.VITE_SUPABASE_URL,
      anonymousKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    }
  }
})

export const sessionStore: Store<Session> = createStore(getInitialSession())

sessionStore.subscribe('credential', (driver: unknown) => {
  if (driver) {
    window.sessionStorage.setItem('credential', JSON.stringify(driver as Driver))
    return
  }
  window.sessionStorage.removeItem('credential')
})
