import { useEffect, useRef } from 'react'

type explicit = {
  effect: () => unknown
  key?: string
}

type implicit = () => unknown

export type useRunOnceParameters = explicit | implicit

export function useRunOnce (parameters: useRunOnceParameters) {
  const triggered = useRef<boolean>(false)

  const { effect, key } = typeof parameters === 'function'
    ? { effect: parameters, key: undefined }
    : parameters

  useEffect(() => {
    const hasBeenTriggered = key
      ? sessionStorage.getItem(key)
      : triggered.current

    if (!hasBeenTriggered) {
      effect()
      triggered.current = true

      if (key) {
        sessionStorage.setItem(key, 'true')
      }
    }
  }, [effect, key])

  return null
}
