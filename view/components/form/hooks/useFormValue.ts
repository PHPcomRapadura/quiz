import { useState } from 'react'
import { get, set } from 'lodash'
import { FormValueUpdate, FormValueWatch, FormValueWatchCallback } from '../index.tsx'

function clone<T> (value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export type FormValueManager<T> = {
  value: T
  update: FormValueUpdate
  watch: FormValueWatch
  reset: () => void
}

export function useFormValue<T> (initial: T): FormValueManager<T> {
  const [value, setData] = useState<T>(clone(initial))

  const update: FormValueUpdate = (fieldName: string, current: unknown): void => {
    const previous = get(value, fieldName)
    const target = value as object
    set(target, fieldName, current)
    setData({
      ...value,
      ...target
    })
    triggerWatch(fieldName, current, previous)
  }

  const watches = new Map<string, FormValueWatchCallback[]>()

  const watch = (field: string, callback: FormValueWatchCallback) => {
    watches.set(field, [...(watches.get(field) ?? []), callback])
  }

  const triggerWatch = (fieldName: string, current: unknown, previous: unknown) => {
    const callbacks = watches.get(fieldName)
    if (callbacks) {
      callbacks.forEach((callback) => callback(current, previous))
    }
  }

  const reset = () => {
    setData(clone(initial))
  }

  return { value, update, reset, watch } as const
}
