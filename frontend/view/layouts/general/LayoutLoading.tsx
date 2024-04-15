import { useEffect, useState } from 'react'

import { If, Loading } from '../../components/general'
import { useLoading } from '../../hooks'

export function LayoutLoading ({ label, initial = true }: { label: string, initial?: boolean }) {
  const { loading, fall } = useLoading(initial)
  const [width, setWidth] = useState<number>(0)

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

  const hide = () => {
    setWidth(0)
    fall()
  }

  return (
    <If condition={loading}>
      <div
        className="LayoutLoading d-flex justify-content-center align-items-center"
        onClick={hide}
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
