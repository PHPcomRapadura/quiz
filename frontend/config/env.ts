import { getInitialSession, sessionStore } from '../view/stores/session.ts'
import { Driver, DriverType } from '../src/Domain/Contracts.ts'

export const getInheritDriver = (): Driver => getInitialSession().driver

export const getSessionDriver = (): Driver => sessionStore.state.driver

export const getDevelopmentMode = (): DriverType | undefined => {
  const type = import.meta.env.VITE_DEVELOPMENT_DRIVER_TYPE
  switch (type) {
    case 'http':
      return DriverType.http
    case 'memory':
      return DriverType.memory
    default:
      return undefined
  }
}
