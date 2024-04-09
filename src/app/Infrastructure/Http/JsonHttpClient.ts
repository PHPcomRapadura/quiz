import type { Content, Data } from '../../Domain/Contracts.ts'
import { Status } from '../../Domain/Contracts.ts'
import HttpClient from './HttpClient.ts'

export default class JsonHttpClient extends HttpClient {
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

  protected configureHeaders () {
    const headers: Record<string, string> = super.configureHeaders()
    headers['Content-Type'] = 'application/json'
    return headers
  }

  protected configureBody (data: Data | null): Data | null {
    return JSON.stringify(data)
  }
}
