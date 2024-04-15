import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { Data } from '../../../Domain/Contracts.ts'

let client: SupabaseClient

export default class SupabaseClientFactory {
  make (config: Data): SupabaseClient {
    try {
      if (!client) {
        client = createClient(config.url as string, config.anonymousKey as string)
      }
      return client
    } catch (error) {
      const message = 'Error making a new Supabase client on SupabaseClientFactory'
      console.error(message, ': ', error)
      throw new Error(message)
    }
  }
}
