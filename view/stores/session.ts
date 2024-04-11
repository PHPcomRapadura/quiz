import { createStore, Store } from '../store.ts'
import { Session } from '../../src/Domain/Auth/Auth.ts'

export const sessionStore: Store<Session> = createStore({
  username: '',
  credential: null,
  abilities: [],
  infra: localStorage.getItem('mode') || import.meta.env.VITE_BACKEND_MODE || 'supabase',
})

sessionStore.subscribe('mode', (mode: unknown) => {
  if (mode) {
    window.sessionStorage.setItem('mode', mode as string)
    return
  }
  window.sessionStorage.removeItem('mode')
})
