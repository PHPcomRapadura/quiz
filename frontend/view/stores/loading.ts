import { createStore, Store } from '../store.ts'

export const loadingStore: Store<{ loading: boolean }> = createStore({ loading: false })
