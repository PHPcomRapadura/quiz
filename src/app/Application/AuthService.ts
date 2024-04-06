import { inject, injectable } from 'tsyringe'
import type AuthRepository from '../Domain/Auth/AuthRepository.ts'
import { Content } from '../Domain/Contracts.ts'

@injectable()
export class AuthService {
  constructor (@inject('AuthRepository') private authRepository: AuthRepository) {}

  async signIn (email: string, password?: string): Promise<Content> {
    if (password) {
      return this.authRepository.signIn(email, password)
    }
    return this.authRepository.signInWithOtp(email)
  }

  async signOut (): Promise<Content> {
    return this.authRepository.signOut()
  }
}
