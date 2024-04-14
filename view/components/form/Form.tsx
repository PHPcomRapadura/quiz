import { FormEvent, ReactNode } from 'react'

import { useLoading } from '../../hooks/useLoading.ts'
import { AlertDanger } from '../general/Alert.tsx'

type FormProps<T, R> = {
  children: ReactNode | ReactNode[]
  value: T
  action: (data: T) => Promise<R>
  onResolve?: (data: R) => void
  onReject?: (error: unknown) => void
  onFinally?: () => void
  error?: string
}

export function Form<T, R> (props: FormProps<T, R>) {
  const {
    children,
    value,
    action,
    onResolve,
    onReject,
    onFinally,
    error
  } = props
  const { start, stop } = useLoading()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    start()
    try {
      const response = await action(value)
      onResolve && onResolve(response)
    } catch (error) {
      onReject && onReject(error)
      return
    } finally {
      stop()
      onFinally && onFinally()
    }
  }

  return (
    <form
      className="form-component"
      onSubmit={handleSubmit}
    >
      {children}
      {
        error && (
          <AlertDanger>
            <span className="text-light-emphasis">{error}</span>
          </AlertDanger>
        )
      }
    </form>
  )
}
