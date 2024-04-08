/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useRef, useState } from 'react'

export type HydrateElementProps = {
  children: ReactNode | ReactNode[]
}

export type HydrateProps = {
  hidrate: () => Promise<any>
  onResolve: (data: any) => void
  onReject?: (data: any) => void
  children: ReactNode | ReactNode[]
}

enum Status {
  PENDING = 'Pending',
  RESOLVED = 'Resolved',
  REJECTED = 'Rejected'
}

export function Pending ({ children }: HydrateElementProps) {
  return children
}

export function Resolved ({ children }: HydrateElementProps) {
  return children
}

export function Rejected ({ children }: HydrateElementProps) {
  return children
}

export function Hydrated ({ hidrate, onResolve, onReject, children }: HydrateProps) {
  const fetched = useRef(false)
  const [status, setStatus] = useState(Status.PENDING)
  useEffect(() => {
    if (fetched.current) {
      return
    }
    const fetchData = async () => {
      fetched.current = true
      try {
        const data = await hidrate()
        onResolve(data)
        setStatus(Status.RESOLVED)
      } catch (e) {
        console.error(e)
        setStatus(Status.REJECTED)
        if (onReject) {
          onReject(e)
        }
      }
    }
    fetchData()
  }, [hidrate, onResolve])
  if (!children) {
    return null
  }
  if (Array.isArray(children)) {
    return children.filter((child: any) => child.type.name === status)
  }
  return (children as any).type.name === status ? children : null
}
