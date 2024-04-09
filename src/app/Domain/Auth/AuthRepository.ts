import { Session } from './Auth.ts'

export default interface AuthRepository {
  signInWithOtp (email: string): Promise<Session>

  signIn (email: string, password: string): Promise<Session>

  signOut (): Promise<boolean>

  restore (): Promise<Session>
}
