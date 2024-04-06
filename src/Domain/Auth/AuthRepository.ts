import { Content } from './Contracts.ts'

export default interface UserRepository {
  signInWithOtp(email: string): Promise<Content>

  signIn (email: string, password: string): Promise<Content>
}
