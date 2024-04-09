import AuthRepository from '../../Domain/Auth/AuthRepository.ts'
import { Content } from '../../Domain/Contracts.ts'
import { HttpClientDriverContract } from '../Http/Contracts.ts'
import HttpClientFactory from '../Http/HttpClientFactory.ts'

export default class HttpAuthRepository implements AuthRepository {
  private http: HttpClientDriverContract

  constructor (factory: HttpClientFactory) {
    this.http = factory.make()
  }

  static build () {
    return new this(new HttpClientFactory())
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
