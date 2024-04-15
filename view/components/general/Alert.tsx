import { ReactNode } from 'react'

type AlertProps = {
  strong?: string
  message?: string
  children?: ReactNode | ReactNode[]
}

export function AlertWarning ({ strong = '', message = 'Whops!', children = [] }: AlertProps) {
  return (
    <div className="alert alert-warning">
      {
        children ?
          children :
          strong ?
            (<><strong>{strong}</strong> {message}</>)
            : message
      }
    </div>
  )
}

export function AlertPrimary ({ strong = '', message = '', children = [] }: AlertProps) {
  return (
    <div className="alert alert-primary">
      {
        children ?
          children :
          strong ?
            (<><strong>{strong}</strong> {message}</>)
            : message
      }
    </div>
  )
}

export function AlertDanger ({ strong = '', message = '', children = [] }: AlertProps) {
  return (
    <div className="alert alert-danger">
      {
        children ?
          children :
          strong ?
            (<><strong>{strong}</strong> {message}</>)
            : message
      }
    </div>
  )
}
