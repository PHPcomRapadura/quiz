/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useRef, useState } from 'react'

export type AsyncElementProps = {
  children: ReactNode | ReactNode[]
  status: AsyncStatus
}

export type AsyncProps = {
  using: () => Promise<any>
  onResolve?: (data: any) => void
  onReject?: (data: any) => void
  children: ReactNode | ReactNode[]
}

// eslint-disable-next-line react-refresh/only-export-components
export enum AsyncStatus {
  Pending = 'Pending',
  Resolved = 'Resolved',
  Rejected = 'Rejected'
}

export function On ({ children }: AsyncElementProps) {
  return children
}

export function Async ({ using, onResolve, onReject, children }: AsyncProps) {
  const fetched = useRef(false)
  const [status, setStatus] = useState(AsyncStatus.Pending)

  useEffect(() => {
    if (fetched.current) {
      return
    }
    const fetchData = async () => {
      fetched.current = true
      try {
        const data = await using()
        onResolve && onResolve(data)
        setStatus(AsyncStatus.Resolved)
      } catch (e) {
        console.error(e)
        setStatus(AsyncStatus.Rejected)
        onReject && onReject(e)
      }
    }
    fetchData()
  }, [fetched, using, onReject, onResolve])

  if (!children) {
    return null
  }
  if (Array.isArray(children)) {
    return children.filter((child: any) => child.props.status === status)
  }
  return (children as any).props.status === status ? children : null
}
