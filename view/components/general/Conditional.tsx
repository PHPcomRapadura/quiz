/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'

type CaseProps = {
  value: unknown
  children: ReactNode | ReactNode[]
}

type ConditionalProps = {
  condition: unknown
  children: ReactNode | ReactNode[]
  defaultValue?: unknown
}

const compare = (child: any, condition: unknown, defaultValue: unknown) => {
  return child.props.value === condition || child.props.value === defaultValue
}

export function Case (props: CaseProps) {
  return props.children
}

export function If (props: ConditionalProps) {
  const { condition, children } = props
  return condition ? children : undefined
}

export function Match (props: ConditionalProps) {
  const { condition, children, defaultValue = undefined } = props
  if (!children) {
    return undefined
  }
  if (Array.isArray(children)) {
    return children.filter((child: any) => compare(child, condition, defaultValue))
  }
  const child = children as any
  return compare(child, condition, defaultValue) ? child : undefined
}

export function Switch (props: ConditionalProps) {
  const { condition, children, defaultValue = undefined } = props
  if (!children) {
    return undefined
  }
  if (!Array.isArray(children)) {
    throw new Error('Conditional/Switch: At least two Case components are required')
  }
  const duplicates = children
    .filter((e1: any, i1) => children
      .some((e2: any, i2) => e2.props.value === e1.props.value && i2 !== i1))
  if (duplicates.length > 0) {
    throw new Error('Conditional/Switch: Duplicate Case values are not allowed')
  }
  return children.find((child: any) => compare(child, condition, defaultValue))
}
