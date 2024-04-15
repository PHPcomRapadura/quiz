import { useState } from 'react'
import { useBeforeUnload } from 'react-router-dom'

import { loadingStore } from '../stores/loading.ts'

type LoadingControl = {
  loading: boolean
  raise: () => void
  fall: () => void
}

export function useLoading (initial: boolean = false): LoadingControl {
  const [loading, setLoading] = useState<boolean>(initial)

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
