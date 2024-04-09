import type { Content, Data } from '../../Domain/Contracts.ts'
import { Status } from '../../Domain/Contracts.ts'
import { HttpClientContract, HttpRequester } from './Contracts.ts'

export default class HttpClient implements HttpClientContract {
  constructor (
    protected baseUrl: string,
    protected unknownErrorMessage: string,
    protected authorization: { type: string, token: string } | undefined
  ) {}

  get http (): HttpRequester {
    const request = async (method: string, path: string, data?: Data): Promise<Content> => {
      try {
        const response = await this.fetch(path, method, data || null)
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

  public configureAuthorization (type: string, token: string): void {
    this.authorization = { type, token }
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
    const content = await response.text()
    if (!response.ok) {
      return {
        status: Status.error,
        message: content || response.statusText || this.extractErrorMessage(null)
      }
    }
    return {
      status: Status.success,
      data: content
    }
  }

  private async fetch (path: string, method: string, data: Data | null) {
    const input = this.normalize(path)
    const init: RequestInit = {
      method: method.toUpperCase(),
      headers: this.configureHeaders(),
      body: data ? this.configureBody(data) as BodyInit : null
    }
    return await fetch(input, init)
  }

  protected configureHeaders () {
    const headers: Record<string, string> = {
      'Content-Type': 'application/www-form-urlencoded'
    }
    if (this.authorization) {
      headers['Authorization'] = `${this.authorization.type} ${this.authorization.token}`
    }
    return headers
  }

  protected configureBody (data: Data | null): Data | null {
    return data
  }
}
