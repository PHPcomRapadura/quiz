import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useApp } from '../../hooks/useApp.ts'
import { ReactNode } from 'react'

export type CredentialRoutesProps = {
  children?: ReactNode | ReactNode[]
  withCredential: boolean
}

export function CredentialChecker ({ children, withCredential }: CredentialRoutesProps) {
  const { session } = useApp()
  const from = useLocation()

  const can = withCredential ? !!session.credential : !session.credential
  if (can) {
    return children ? children : <Outlet />
  }

  const route = withCredential ? '/auth/sign-in' : '/dashboard'
  return <Navigate
    to={route}
    state={{ from }}
    replace
  />
}
