/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'

export type CaseProps = {
  value: unknown
  children: ReactNode | ReactNode[]
}

export function Case (props: CaseProps) {
  return props.children
}

export type ConditionalProps = {
  condition: unknown
  children: ReactNode | ReactNode[]
}

export function If (props: ConditionalProps) {
  const { condition, children } = props
  return condition ? children : undefined
}

export function Match (props: ConditionalProps) {
  const { condition, children } = props
  if (!children) {
    return undefined
  }
  if (Array.isArray(children)) {
    return children.find((child: any) => child.props.value === condition)
  }
  const child = children as any
  return child.props.value === condition
}
