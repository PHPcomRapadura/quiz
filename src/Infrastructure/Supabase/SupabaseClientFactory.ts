import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient

export default class SupabaseClientFactory {
  make (): SupabaseClient {
    const url = import.meta.env.VITE_SUPABASE_URL
    const anonymousKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    if (!client) {
      client = createClient(url, anonymousKey)
    }
    return client
  }
}
