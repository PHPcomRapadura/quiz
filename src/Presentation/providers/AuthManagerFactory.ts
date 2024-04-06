import { Session } from '../types'
import { container } from 'tsyringe'
import { AuthService } from '../../Application/AuthService.ts'

export function authManagerFactory (setSession: (session: Session) => void) {
  const authService = container.resolve<AuthService>('AuthService')
  return {
    async signIn (username: string, password: string): Promise<Session> {
      const content = await authService.signIn(username, password)
      const data = content.data as Session
      if (content.status !== 'success' || !data) {
        return null
      }
      const user: Session = {
        abilities: data.abilities,
        username: username,
      }
      setSession(user)
      return user
    },
    async signOut (): Promise<boolean> {
      const content = await authService.signOut()
      if (content.status !== 'success') {
        return false
      }
      setSession(null)
      return true
    }
  }
}
