import { createStore, Store } from '../store.ts'
import { Session } from '../../src/Domain/Auth/Auth.ts'
import { Driver } from '../../src/Domain/Contracts.ts'

export const sessionStore: Store<Session> = createStore({
  username: '',
  credential: null,
  abilities: [],
  driver: window.sessionStorage.getItem('driver') ?
    JSON.parse(window.sessionStorage.getItem('driver') as string) :
    undefined,
})

sessionStore.subscribe('driver', (driver: unknown) => {
  if (driver) {
    window.sessionStorage.setItem('driver', JSON.stringify(driver as Driver))
    return
  }
  window.sessionStorage.removeItem('driver')
})
