export default class InMemoryRepository {
  async promisify <T>(data: T): Promise<T> {
    const timeout = import.meta.env.VITE_IN_MEMORY_TIMEOUT || 300
    return new Promise((resolve) => {
      const handler = () => resolve(data)
      window.setTimeout(handler, Number(timeout))
    })
  }
}
