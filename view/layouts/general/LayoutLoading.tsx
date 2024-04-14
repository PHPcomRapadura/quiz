import { Loading } from '../../components/general/Loading.tsx'
import { If } from '../../components/general/Conditional.tsx'
import { loadingStore } from '../../stores/loading.ts'
import { useEffect, useState } from 'react'
import { useBeforeUnload } from 'react-router-dom'

export function LayoutLoading ({ label, initial = true }: { label: string, initial?: boolean }) {
  const [loading, setLoading] = useState<boolean>(initial)
  const [width, setWidth] = useState<number>(0)

  const subscriptionId = loadingStore.subscribe('loading', (value: unknown) => {
    if (value !== loading) {
      setLoading(!!value)
      setWidth(0)
    }
  })
  useBeforeUnload(() => loadingStore.unsubscribe('loading', subscriptionId))

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prev) => {
        const factor = prev > 50 ? 20 : 10
        if (prev < 100) {
          return prev + factor
        }
        return 100
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <If condition={loading}>
      <div
        className="LayoutLoading d-flex justify-content-center align-items-center"
        onClick={() => loadingStore.state.loading = false}
      >
        <div className="container">
          <div className="bg-primary rounded p-3">
            <Loading
              label={label}
              width={`${width}%`}
            />
          </div>
        </div>
      </div>
    </If>
  )
}
