import AuthRepository from '../../Domain/Auth/AuthRepository.ts'
import SupabaseClientFactory from './SupabaseClientFactory.ts'
import { AuthOtpResponse, SupabaseClient } from '@supabase/supabase-js'
import { Session } from '../../Domain/Auth/Auth.ts'

export default class SupabaseAuthRepository implements AuthRepository {
  private driver: SupabaseClient

  constructor (supabaseClientFactory: SupabaseClientFactory) {
    this.driver = supabaseClientFactory.make()
  }

  static build () {
    return new this(new SupabaseClientFactory())
  }

  async signInWithOtp (email: string): Promise<Session> {
    const response: AuthOtpResponse = await this.driver.auth.signInWithOtp({ email })
    const { error } = response
    if (error) {
      throw new Error(error.message)
    }
    return {
      username: email,
      abilities: []
    }
  }

  async signIn (email: string, password: string): Promise<Session> {
    const { data, error }  = await this.driver.auth.signInWithPassword({ email, password })
    if (error) {
      throw new Error(error.message)
    }
    const { session } = data
    if (!session?.user?.email) {
      throw new Error('Invalid session found')
    }
    return {
      username: session?.user?.email,
      credential: {
        token: session?.access_token,
        refresh: session?.refresh_token,
        expiresAt: session?.expires_at,
        type: session?.token_type
      },
      abilities: []
    }
  }

  signOut (): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async restore (): Promise<Session> {
    const { data, error } = await this.driver.auth.getSession()
    if (error) {
      throw new Error(error.message)
    }
    const { session } = data
    if (!session?.user?.email) {
      throw new Error('Invalid session found')
    }
    return {
      username: session?.user?.email,
      credential: {
        token: session?.access_token,
        refresh: session?.refresh_token,
        expiresAt: session?.expires_at,
        type: session?.token_type
      },
      abilities: []
    }
  }
}
