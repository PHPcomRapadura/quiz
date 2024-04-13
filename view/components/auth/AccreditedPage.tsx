import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useApp } from '../../hooks/useApp.ts'
import { ReactNode } from 'react'

export function AccreditedPage ({ children }: { children?: ReactNode | ReactNode[] }) {
  const { session } = useApp()
  const from = useLocation()

  if (session.credential) {
    return children ? children : <Outlet />
  }

  return <Navigate
    to="/auth/sign-in"
    state={{ from }}
    replace
  />
}
