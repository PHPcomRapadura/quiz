import { ReactNode, useState } from 'react'
import { useRunOnce } from '../../hooks/useRunOnce.ts'

export type AsyncElementProps = {
  children: ReactNode | ReactNode[]
  status: AsyncStatus
}

export type AsyncProps = {
  using: () => Promise<unknown>
  onResolve?: (data: unknown) => void
  onReject?: (data: unknown) => void
  onFinally?: () => void
  children: ReactNode | ReactNode[]
}

// eslint-disable-next-line react-refresh/only-export-components
export enum AsyncStatus {
  Pending = 'Pending',
  Resolved = 'Resolved',
  Rejected = 'Rejected',
}

export function On ({ children }: AsyncElementProps) {
  return children
}

export function Async (props: AsyncProps) {
  const {
    using,
    onResolve,
    onReject,
    onFinally,
    children
  } = props
  const [status, setStatus] = useState(AsyncStatus.Pending)

  useRunOnce(async () => {
    try {
      const data = await using()
      onResolve && onResolve(data)
      setStatus(AsyncStatus.Resolved)
    } catch (error) {
      console.error('Async detected an error: ', error)
      setStatus(AsyncStatus.Rejected)
      onReject && onReject(error)
    } finally {
      onFinally && onFinally()
    }
  })

  if (!children) {
    return null
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (Array.isArray(children)) {
    return children.filter((child: any) => child.props.status === status)
  }
  return (children as any).props.status === status ? children : null
}
