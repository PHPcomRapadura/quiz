import { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useApp } from '../../hooks'

export type CredentialCheckerProps = {
  children?: ReactNode | ReactNode[]
  reverse?: boolean
}

export function CredentialChecker ({ children, reverse = false }: CredentialCheckerProps) {
  const { session } = useApp()
  const from = useLocation()

  const can = reverse ? !session.credential : !!session.credential
  if (can) {
    return children ? children : <Outlet />
  }

  const route: string = reverse ? '/dashboard' : '/auth/sign-in'
  return <Navigate
    to={route}
    state={{ from }}
    replace
  />
}
