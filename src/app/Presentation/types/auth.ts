
export type Session = { username: string, abilities?: string[] } | null

export interface AuthContract {
  signIn (username: string, password: string): Promise<Session>

  signOut (): Promise<boolean>
}
