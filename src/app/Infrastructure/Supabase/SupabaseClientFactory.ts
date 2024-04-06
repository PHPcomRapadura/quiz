import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonymousKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client: SupabaseClient

export default function (): SupabaseClient {
  if (!client) {
    client = createClient(url, anonymousKey)
  }
  return client
}
