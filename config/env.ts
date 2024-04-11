import { sessionStore } from '../view/stores/session.ts'
import { Driver, DriverType } from '../src/Domain/Contracts.ts'

export const driverDefault: Driver = {
  type: DriverType.supabase,
  config: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonymousKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  }
}

export const loadedDriver = (): Driver => sessionStore.state?.driver || driverDefault
