export interface StoreState {
  [key: string | symbol]: unknown
}

export type StoreCallback = (current?: unknown, previous?: unknown) => void

export interface Store<T> {
  state: T
  subscribe: (property: keyof T, callback: StoreCallback) => number
  unsubscribe: (property: keyof T, index: number) => void
}

export function createStore<T> (initial: StoreState): Store<T> {
  type Key = keyof T
  type EventMap = Record<Key, Array<StoreCallback>>

  const EVENTS: EventMap = Object.create({})

  const publish = (eventName: Key, current: unknown, previous: unknown) => {
    const subscribers = EVENTS[eventName]
    if (subscribers) {
      subscribers.forEach((callback: StoreCallback) => callback(current, previous))
    }
  }

  const state = new Proxy(initial, {
    get (target: StoreState, property) {
      return target[property]
    },
    set (target: StoreState, property, current) {
      const previous = target[property]
      target[property] = current
      publish(property as Key, current, previous)
      return true
    }
  })

  return {
    state: state as T,
    subscribe: function (property: Key, callback: StoreCallback) {
      if (!EVENTS[property]) {
        EVENTS[property] = []
      }
      return EVENTS[property].push(callback)
    },
    unsubscribe: function (property: Key, id: number) {
      if (!EVENTS[property]) {
        return
      }
      EVENTS[property].splice(id - 1, 1)
    }
  }
}
