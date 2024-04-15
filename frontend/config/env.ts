import { getInitialSession, sessionStore } from '../view/stores/session.ts'
import { Driver } from '../src/Domain/Contracts.ts'

export const getInheritDriver = (): Driver => getInitialSession().driver

export const getSessionDriver = (): Driver => sessionStore.state.driver

export const isDevelopmentMode = (): boolean => import.meta.env.VITE_DEVELOPMENT_MODE === 'true'
