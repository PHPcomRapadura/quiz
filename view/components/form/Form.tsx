import { FormEvent, ReactNode } from 'react'

import { useLoading } from '../../hooks'

import { AlertDanger } from '../general'

type Children = ReactNode | ReactNode[]

type ChildrenLoader = (loading: boolean) => Children

type FormProps<T> = {
  fields: Children
  action: (rawValue: FormData) => Promise<T>
  onResolve?: (data: T) => void
  onReject?: (error: unknown) => void
  onFinally?: () => void
  error?: string
  buttons?: ChildrenLoader | Children
}

export function Form<T> (props: FormProps<T>) {
  const {
    action,
    fields,
    onResolve,
    onReject,
    onFinally,
    error,
    buttons,
  } = props
  const { raise, fall, loading } = useLoading()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const rawValue = new FormData(event.currentTarget)
    try {
      raise()
      const response = await action(rawValue)
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
      onSubmit={onSubmit}
    >
      {fields}
      {
        buttons && (
          <>
            <hr />
            <div className="form-action align-right">
              {
                typeof buttons === 'function' ?
                  buttons(loading) :
                  buttons
              }
            </div>
          </>
        )
      }
      {
        error && (
          <div className="pt-2">
            <AlertDanger>
              <span className="text-light-emphasis">{error}</span>
            </AlertDanger>
          </div>
        )
      }
    </form>
  )
}
