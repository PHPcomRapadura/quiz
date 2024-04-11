export interface StoreState {
  [key: string | symbol]: unknown
}

export interface Store<T> {
  state: T
  subscribe: (property: string, callback: (data: unknown) => void) => number
  unsubscribe: (property: string, index: number) => void
}

export function createStore<T> (initial: StoreState): Store<T> {
  type EventMap = {
    [key: string]: Array<(data: unknown) => void>
  };

  const events: EventMap = {}

  const publish = (eventName: string, data: unknown) => {
    const subscribers = events[eventName]
    if (subscribers) {
      subscribers.forEach((callback) => {
        callback(data)
      })
    }
  }

  const state = new Proxy(initial, {
    get (target, property) {
      return target[property]
    },
    set (target, property, value) {
      if (target[property] === value) {
        return true
      }
      target[property] = value
      publish(property as string, value)
      return true
    }
  })

  const subscribe = function (property: string, callback: (data: unknown) => void) {
    if (!events[property]) {
      events[property] = []
    }
    return events[property].push(callback)
  }
  const unsubscribe = function (property: string, index: number) {
    if (!events[property]) {
      return
    }
    events[property].splice(index - 1, 1)
  }
  return {
    state: state as T,
    subscribe,
    unsubscribe
  }
}
