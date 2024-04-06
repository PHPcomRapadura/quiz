import AuthRepository from '../../Domain/Auth/AuthRepository.ts'
import { Content } from '../../Domain/Contracts.ts'
import { HttpClientDriverContract } from './Contracts.ts'
import HttpClientFactory from './HttpClientFactory.ts'

export default class JsonHttpAuthRepository implements AuthRepository {
  private http: HttpClientDriverContract

  constructor () {
    this.http = HttpClientFactory()
  }

  async signInWithOtp (email: string): Promise<Content> {
    return this.http.post('auth/otp', { email })
  }

  async signIn (email: string, password: string): Promise<Content> {
    return this.http.post('auth/signin', { email, password })
  }

  async signOut (): Promise<Content> {
    return this.http.post('auth/signout')
  }
}
