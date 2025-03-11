import { getInitialSession, sessionStore } from '../view/stores/session.ts'
import { Driver, DriverType } from '../src/Domain/Contracts.ts'

export const getInheritDriver = (): Driver => getInitialSession().driver

export const getSessionDriver = (): Driver => sessionStore.state.driver

export const getDevelopmentMode = (): DriverType | undefined => {
  const type = import.meta.env.VITE_DRIVER_TYPE_DEFAULT
  switch (type) {
    case 'http':
      return DriverType.http
    case 'memory':
      return DriverType.memory
    case 'supabase':
      return DriverType.supabase
    case 'json':
      return DriverType.json
    default:
      return undefined
  }
}
