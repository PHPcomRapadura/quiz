import type { Content, Data } from '../../Domain/Contracts.ts'

export interface HttpRequester {
  request: (method: string, path: string, data?: Data) => Promise<Content>
}

export interface HttpClientContract {
  http: HttpRequester

  configureAuthorization (type: string, token: string): void
}

export interface HttpClientDriverContract {
  get (url: string): Promise<Content>

  post (url: string, data?: Data): Promise<Content>

  put (url: string, data?: Data): Promise<Content>

  patch (url: string, data?: Data): Promise<Content>

  head (url: string, data?: Data): Promise<Content>

  delete (url: string): Promise<Content>
}
