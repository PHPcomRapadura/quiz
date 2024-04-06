import UserRepository from '../../Domain/UserRepository.ts'
import SupabaseClientFactory from './Drivers/SupabaseClientFactory.ts'
import { SupabaseClient } from '@supabase/supabase-js'

export default class SupabaseUserRepository implements UserRepository {
  private driver: SupabaseClient
  constructor () {
    this.driver = SupabaseClientFactory()
  }

  async signInWithOtp (email: string) {
    return this.driver.auth.signInWithOtp({ email })
  }

  signIn (email: string, password: string): Promise<unknown> {
    return this.driver.auth.signInWithPassword({ email, password })
  }
}
