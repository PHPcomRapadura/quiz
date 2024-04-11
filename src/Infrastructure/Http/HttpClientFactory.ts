import JsonHttpClient from './JsonHttpClient.ts'
import { Content, Data } from '../../Domain/Contracts.ts'
import { HttpClientContract, HttpClientDriverContract } from './Contracts.ts'

const clients: Record<string, HttpClientContract> = {}

export default class HttpClientFactory {
  make (
    name: string = 'default',
    baseUrl: string = import.meta.env.VITE_DEFAULT_API_URL || '',
    unknownErrorMessage: string = 'Unknown error',
    authorization: { type: string, token: string } | undefined = undefined
  ): HttpClientDriverContract {
    if (!clients[name]) {
      clients[name] = new JsonHttpClient(baseUrl, unknownErrorMessage, authorization)
    }

    return {
      post (path: string, data?: Data): Promise<Content> {
        return clients[name].http.request('POST', path, data)
      },
      get (path: string): Promise<Content> {
        return clients[name].http.request('GET', path)
      },
      put (path: string, data?: Data): Promise<Content> {
        return clients[name].http.request('PUT', path, data)
      },
      patch (path: string, data?: Data): Promise<Content> {
        return clients[name].http.request('PATCH', path, data)
      },
      head (path: string, data?: Data): Promise<Content> {
        return clients[name].http.request('HEAD', path, data)
      },
      delete (path: string): Promise<Content> {
        return clients[name].http.request('DELETE', path)
      }
    }
  }
}
