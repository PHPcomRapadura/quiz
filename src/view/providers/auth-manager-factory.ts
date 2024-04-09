import { Session } from '../contracts.ts'
import { container } from 'tsyringe'
import { AuthService } from '../../app/Application/AuthService.ts'

export function authManagerFactory (updateAuthSession: (session: Session) => void) {
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
      updateAuthSession(null)
      return true
    },
    async restore (): Promise<Session> {
      const session = await authService.restore()
      console.log(session)
      updateAuthSession(session)
      return session
    }
  }
}
