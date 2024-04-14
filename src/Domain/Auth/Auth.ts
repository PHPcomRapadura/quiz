import { Driver, Id } from '../Contracts.ts'

export type Credential = {
  token: string
  refresh: string
  expiresAt: number | string | undefined
  type: string
} | undefined

export type Session = {
  id?: Id
  username: string
  credential: Credential
  abilities: string[]
  driver: Driver
}

export interface AuthContract {
  signIn (username: string, password?: string | null): Promise<Session>

  signOut (): Promise<boolean>

  restore (): Promise<Session>
}
