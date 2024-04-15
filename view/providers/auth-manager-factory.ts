import { Session } from '../contracts.ts'
import { container } from 'tsyringe'
import { AuthService } from '../../src/Application/Auth/AuthService.ts'
import { getInitialSession } from '../stores/session.ts'
import { Credential } from '../../src/Domain/Auth/Auth.ts'

export function authManagerFactory (updateAuthSession: (session: Session) => void, context: Credential) {
  const authService = container.resolve<AuthService>('AuthService')
  return {
    async signIn (username: string, password: string): Promise<Session> {
      const session = await authService.signIn(username, password)
      updateAuthSession(session)
      return session
    },
    async signOut (): Promise<boolean> {
      const done = await authService.signOut()
      if (!done) {
        return false
      }
      updateAuthSession(getInitialSession(false))
      return true
    },
    async restore (): Promise<Session> {
      const session = await authService.restore(context)
      updateAuthSession(session)
      return session
    }
  }
}
