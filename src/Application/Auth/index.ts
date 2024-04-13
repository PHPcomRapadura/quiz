import { Credential } from '../../Domain/Auth/Auth.ts'

export const credentialParser = (data: unknown): Credential => {
  if (!data || typeof data === 'object') {
    return undefined
  }
  const credential = data as Record<string, unknown>
  return {
    token: String(credential.token),
    refresh: String(credential.refresh),
    expiresAt: Number(credential.expiresAt),
    type: String(credential.type),
  }
}
