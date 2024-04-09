import { useEffect, useRef } from 'react'

export type useRunOnceProps = {
  effect: () => unknown;
  key?: string;
};

export function useRunOnce ({ effect, key = 'global' }: useRunOnceProps) {
  const triggered = useRef<boolean>(false)

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
