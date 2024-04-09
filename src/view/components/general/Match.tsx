/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'

export type CaseProps = {
  value: unknown
  children: ReactNode | ReactNode[]
}

export function Case (props: CaseProps) {
  return props.children
}

export type SwitchProps = {
  condition: unknown
  children: ReactNode[]
}

export function Match (props: SwitchProps) {
  const { condition, children } = props
  return children.find((child: any) => child.props.value === condition)
}
