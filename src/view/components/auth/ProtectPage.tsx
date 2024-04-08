import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useApp } from '../../hooks'
import { ReactNode } from 'react'

export function ProtectPage ({ children }: { children?: ReactNode | ReactNode[] }) {
  const app = useApp()
  const from = useLocation()
  if (app.session) {
    return children ? children : <Outlet />
  }
  return <Navigate
    to="/login"
    state={{ from }}
    replace
  />
}
