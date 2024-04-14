import { FormEvent, ReactNode } from 'react'

import { useLoading } from '../../hooks/useLoading.ts'
import { AlertDanger } from '../general/Alert.tsx'

type FormProps<T, R> = {
  children: ReactNode | ReactNode[]
  value: T
  action: (data: T, rawValue: FormData) => Promise<R>
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
  const { raise, fall } = useLoading()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const rawValue = new FormData(event.currentTarget)
    try {
      raise()
      const response = await action(value, rawValue)
      onResolve && onResolve(response)
    } catch (error) {
      onReject && onReject(error)
      return
    } finally {
      fall()
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
