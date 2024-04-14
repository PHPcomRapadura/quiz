import { loadingStore } from '../stores/loading.ts'
import { useState } from 'react'
import { useBeforeUnload } from 'react-router-dom'

export function useLoading (): { loading: boolean, raise: () => void, fall: () => void } {
  const [loading, setLoading] = useState<boolean>(false)

  const subscriptionId = loadingStore.subscribe('loading', (value: unknown) => {
    if (value !== loading) {
      setLoading(!!value)
    }
  })
  useBeforeUnload(() => loadingStore.unsubscribe('loading', subscriptionId))

  return {
    loading,
    raise: () => loadingStore.state.loading = true,
    fall: () => loadingStore.state.loading = false
  } as const
}
