import { Loading } from '../components/general/Loading.tsx'
import { If } from '../components/general/Conditional.tsx'
import { loadingStore } from '../stores/loading.ts'
import { useState } from 'react'
import { useBeforeUnload } from 'react-router-dom'

export function LayoutLoading ({ label, initial = true }: { label: string, initial?: boolean }) {
  const [loading, setLoading] = useState<boolean>(initial)

  const id = loadingStore.subscribe('loading', (value: unknown) => {
    if (value !== loading) {
      setLoading(!!value)
    }
  })

  useBeforeUnload(() => loadingStore.unsubscribe('loading', id))

  return (
    <If condition={loading}>
      <div
        className="LayoutLoading d-flex justify-content-center align-items-center"
        onClick={() => loadingStore.state.loading = false}
      >
        <div className="container">
          <div className="bg-primary rounded p-3">
            <Loading label={label} />
          </div>
        </div>
      </div>
    </If>
  )
}
