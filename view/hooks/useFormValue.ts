import { useState } from 'react'
import { get, set } from 'lodash'
import { FormValueUpdate, FormValueWatch, FormValueWatchCallback } from '../components/form'

export function useFormValue<T> (initial: T): [T, FormValueUpdate, FormValueWatch] {
  const [data, setData] = useState(initial)

  const update: FormValueUpdate = (fieldName: string, current: unknown): void => {
    const previous = get(data, fieldName)
    const target = data as object
    set(target, fieldName, current)
    setData({
      ...data,
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

  return [data, update, watch] as const
}
