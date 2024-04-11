import AuthRepository from '../../Domain/Auth/AuthRepository.ts'
import { Session } from '../../Domain/Auth/Auth.ts'
import InMemoryRepository from '../Driver/Memory/InMemoryRepository.ts'

export default class InMemoryAuthRepository extends InMemoryRepository implements AuthRepository {
  restore (): Promise<Session> {
    return this.promisify({
      username: 'memory',
      abilities: []
    })
  }

  signIn (username: string, password: string): Promise<Session> {
    return this.promisify({
      username: username + ':' + password,
      abilities: []
    })
  }

  signInWithOtp (username: string): Promise<Session> {
    return this.promisify({
      username: username,
      abilities: []
    })
  }

  signOut (): Promise<boolean> {
    return Promise.resolve(true)
  }

}
