import AuthRepository from '../../Domain/Auth/AuthRepository.ts'
import { Data, Status } from '../../Domain/Contracts.ts'
import { HttpClientDriverContract } from '../Driver/Http/Contracts.ts'
import HttpClientFactory from '../Driver/Http/HttpClientFactory.ts'
import { Session } from '../../Domain/Auth/Auth.ts'

export default class HttpAuthRepository implements AuthRepository {
  private http: HttpClientDriverContract

  constructor (factory: HttpClientFactory) {
    this.http = factory.make()
  }

  static build () {
    return new this(new HttpClientFactory())
  }

  async signInWithOtp (email: string): Promise<Session> {
    const response = await this.http.post('/auth/otp', { email })
    if (response.status !== Status.success) {
      throw new Error(response.message)
    }
    const data = response.data as Data
    const user = data.user as Data
    return {
      username: user?.username as string,
      abilities: []
    }
  }

  async signIn (email: string, password: string): Promise<Session> {
    const response = await this.http.post('/auth/sign-in', { email, password })
    if (response.status !== Status.success) {
      throw new Error(response.message)
    }
    const data = response.data as Data
    const user = data.user as Data
    const credential = data.token as Data
    return {
      username: user?.username as string,
      credential: {
        token: credential?.token as string,
        refresh: credential?.refresh as string,
        expiresAt: credential?.expiresAt as string,
        type: credential?.type as string,
      },
      abilities: []
    }
  }

  async signOut (): Promise<boolean> {
    const { status } = await this.http.post('/auth/sign-out')
    return status === Status.success
  }

  async restore (): Promise<Session> {
    const response = await this.http.get('/auth/me')
    if (response.status !== Status.success) {
      throw new Error(response.message)
    }
    const data = response.data as Data
    const user = data.user as Data
    return {
      username: user?.username as string,
      abilities: []
    }
  }
}
