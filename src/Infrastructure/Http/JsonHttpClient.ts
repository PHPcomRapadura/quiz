import { Status } from '../../Domain/Contracts.ts'
import type { Content, Data } from '../../Domain/Contracts.ts'
import { HttpRequester, HttpClientContract } from './Contracts.ts'

export default class JsonHttpClient implements HttpClientContract {
  constructor (
    private baseUrl: string,
    private unknownErrorMessage: string,
    private authorization: { type: string, token: string } | undefined
  ) {}

  get http (): HttpRequester {
    const request = async (method: string, path: string, data?: Data): Promise<Content> => {
      try {
        const response = await this.fetch(path, method, data)
        return this.parseContent(response)
      } catch (error) {
        return {
          status: Status.error,
          message: this.extractErrorMessage(error)
        }
      }
    }
    return Object.freeze({ request })
  }

  normalize (path: string) {
    return (this.baseUrl + path)
      .replace(/([^:]\/)\/+/g, '$1')
  }

  protected extractErrorMessage (exception: unknown): string {
    if (typeof exception === 'string') {
      return exception
    }
    if (exception instanceof Error) {
      return exception.message
    }
    return this.unknownErrorMessage
  }

  protected async parseContent (response: Response): Promise<Content> {
    const content = await response.json()
    if (!response.ok) {
      return {
        status: Status.error,
        message: content.message || response.statusText || this.extractErrorMessage(null)
      }
    }
    return { status: content.status, data: content.data }
  }

  protected async fetch (path: string, method: string, data: Data | undefined) {
    const input = this.normalize(path)
    const init = {
      headers: this.configureHeaders(),
      method: method.toUpperCase(),
      body: JSON.stringify(data)
    }
    return await fetch(input, init)
  }

  protected configureHeaders () {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (this.authorization) {
      headers['Authorization'] = `${this.authorization.type} ${this.authorization.token}`
    }
    return headers
  }

  public configureAuthorization (type: string, token: string): void {
    this.authorization = { type, token }
  }
}
