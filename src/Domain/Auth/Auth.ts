import { Driver } from '../Contracts.ts'

export type Session = {
  username: string
  credential?: {
    token: string
    refresh: string
    expiresAt: number | string | undefined
    type: string
  }
  abilities?: string[]
  driver?: Driver
} | null

export interface AuthContract {
  signIn (username: string, password: string | null): Promise<Session>

  signOut (): Promise<boolean>

  restore (): Promise<Session>
}
