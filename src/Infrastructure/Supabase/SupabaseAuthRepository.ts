import { AuthOtpResponse } from '@supabase/supabase-js'

import SupabaseRepository from '../Driver/Supabase/SupabaseRepository.ts'

import AuthRepository from '../../Domain/Auth/AuthRepository.ts'
import { Session } from '../../Domain/Auth/Auth.ts'
import { Data } from '../../Domain/Contracts.ts'
import { getInheritDriver } from '../../../config/env.ts'

export default class SupabaseAuthRepository extends SupabaseRepository implements AuthRepository {
  static build (config: Data) {
    return new this(config)
  }

  async signInWithOtp (email: string): Promise<Session> {
    const response: AuthOtpResponse = await this.driver.auth.signInWithOtp({ email })
    const { error } = response
    if (error) {
      throw new Error(error.message)
    }
    return {
      username: email,
      abilities: [],
      credential: undefined,
      driver: getInheritDriver()
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
      abilities: [],
      driver: getInheritDriver()
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
    let username = ''
    let credential
    if (session?.user?.email) {
      username = session?.user?.email
      credential = {
        token: session?.access_token,
        refresh: session?.refresh_token,
        expiresAt: session?.expires_at,
        type: session?.token_type
      }
    }
    return {
      username: username,
      credential: credential,
      abilities: [],
      driver: getInheritDriver()
    }
  }
}
