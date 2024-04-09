/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useRef, useState } from 'react'

export type HydrateElementProps = {
  children: ReactNode | ReactNode[]
  status: HydratedStatus
}

export type HydrateProps = {
  hidrate: () => Promise<any>
  onResolve: (data: any) => void
  onReject?: (data: any) => void
  children: ReactNode | ReactNode[]
}

// eslint-disable-next-line react-refresh/only-export-components
export enum HydratedStatus {
  Pending = 'Pending',
  Resolved = 'Resolved',
  Rejected = 'Rejected'
}

export function On ({ children }: HydrateElementProps) {
  return children
}

export function Hydrated ({ hidrate, onResolve, onReject, children }: HydrateProps) {
  const fetched = useRef(false)
  const [status, setStatus] = useState(HydratedStatus.Pending)

  useEffect(() => {
    if (fetched.current) {
      return
    }
    const fetchData = async () => {
      fetched.current = true
      try {
        const data = await hidrate()
        onResolve(data)
        setStatus(HydratedStatus.Resolved)
      } catch (e) {
        console.error(e)
        setStatus(HydratedStatus.Rejected)
        if (onReject) {
          onReject(e)
        }
      }
    }
    fetchData()
  }, [fetched, hidrate, onReject, onResolve])

  if (!children) {
    return null
  }
  if (Array.isArray(children)) {
    return children.filter((child: any) => child.props.status === status)
  }
  return (children as any).props.status === status ? children : null
}
