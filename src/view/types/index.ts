import DependencyContainer from 'tsyringe/dist/typings/types/dependency-container'
import { AuthContract, Session } from './auth.ts'

export type { AuthContract, Session }

export interface AppContextContract {
    container: DependencyContainer
    session: Session
    auth: AuthContract
}
