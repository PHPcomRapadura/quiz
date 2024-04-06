export default interface UserRepository {
  signInWithOtp(email: string): Promise<unknown>

  signIn (email: string, password: string): Promise<unknown>
}
