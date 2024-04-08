/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactElement, ReactNode } from 'react'

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

export function Switch (props: SwitchProps) {
  const { condition, children } = props
  // @ts-ignore
  return children.find((child: ReactElement) => child.props.value === condition)
}
