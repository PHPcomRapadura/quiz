import { injectable, inject } from 'tsyringe'
import type UserRepository from '../Domain/UserRepository.ts'

@injectable()
export class AuthService {
  constructor (@inject('UserRepository') private userRepository: UserRepository) {}

  async signIn (email: string, password?: string) {
    if (password) {
      return this.userRepository.signIn(email, password)
    }
    return this.userRepository.signInWithOtp(email)
  }
}
