import { loadingStore } from '../stores/loading.ts'
import { useState } from 'react'
import { useBeforeUnload } from 'react-router-dom'

export function useLoading (): { loading: boolean, start: () => void, stop: () => void } {
  const [loading, setLoading] = useState<boolean>(false)

  const subscriptionId = loadingStore.subscribe('loading', (value: unknown) => {
    if (value !== loading) {
      setLoading(!!value)
    }
  })
  useBeforeUnload(() => loadingStore.unsubscribe('loading', subscriptionId))

  return {
    loading,
    start: () => loadingStore.state.loading = true,
    stop: () => loadingStore.state.loading = false
  } as const
}
