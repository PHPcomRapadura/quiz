import { SupabaseClient } from '@supabase/supabase-js'
import SupabaseClientFactory from './SupabaseClientFactory.ts'
import { Data } from '../../../Domain/Contracts.ts'

export default class SupabaseRepository {
  protected readonly driver: SupabaseClient

  constructor (config: Data) {
    this.driver = (new SupabaseClientFactory()).make(config)
  }
}
