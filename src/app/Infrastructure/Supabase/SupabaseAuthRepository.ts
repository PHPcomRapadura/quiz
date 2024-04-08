import type { AuthTokenResponsePassword } from '@supabase/auth-js/dist/module/lib/types.ts'
import { inject } from 'tsyringe'

import AuthRepository from '../../Domain/Auth/AuthRepository.ts'
import SupabaseClientFactory from './SupabaseClientFactory.ts'
import { AuthOtpResponse, SupabaseClient } from '@supabase/supabase-js'
import { Content, Status } from '../../Domain/Contracts.ts'

export default class SupabaseAuthRepository implements AuthRepository {
  private driver: SupabaseClient

  constructor (@inject('SupabaseClientFactory') supabaseClientFactory: SupabaseClientFactory) {
    this.driver = supabaseClientFactory.make()
  }

  async signInWithOtp (email: string): Promise<Content> {
    const response: AuthOtpResponse = await this.driver.auth.signInWithOtp({ email })
    return {
      status: response.error ? Status.error : Status.success,
      data: response.data,
      message: response.error?.message
    }
  }

  async signIn (email: string, password: string): Promise<Content> {
    const response: AuthTokenResponsePassword = await this.driver.auth.signInWithPassword({ email, password })
    return {
      status: response.error ? Status.error : Status.success,
      data: response.data,
      message: response.error?.message
    }
  }

  signOut (): Promise<Content> {
    throw new Error('Method not implemented.')
  }
}
