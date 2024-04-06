import { Content } from '../Contracts.ts'

export default interface AuthRepository {
  signInWithOtp (email: string): Promise<Content>

  signIn (email: string, password: string): Promise<Content>

  signOut (): Promise<Content>
}
