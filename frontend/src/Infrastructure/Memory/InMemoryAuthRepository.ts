import AuthRepository from '../../Domain/Auth/AuthRepository.ts'
import { Credential, Session } from '../../Domain/Auth/Auth.ts'
import InMemoryRepository from '../Driver/InMemory/InMemoryRepository.ts'
import { DriverType } from '../../Domain/Contracts.ts'
import { credentialParser } from '../../Application/Auth'

export default class InMemoryAuthRepository extends InMemoryRepository implements AuthRepository {
  restore (context: Credential): Promise<Session> {
    const session: Session = {
      username: '',
      abilities: [],
      credential: undefined,
      driver: {
        type: DriverType.memory,
        config: {}
      }
    }
    if (context) {
      session.username = 'user@memory'
      session.credential = credentialParser(context)
    }
    return this.promisify(session)
  }

  signIn (username: string, password: string): Promise<Session> {
    return this.promisify({
      username: username,
      abilities: [],
      credential: {
        token: 'string',
        refresh: 'string',
        expiresAt: 'number | string | undefined',
        type: 'string',
      },
      driver: {
        type: DriverType.memory,
        config: {
          password
        }
      }
    })
  }

  signInWithOtp (username: string): Promise<Session> {
    return this.promisify({
      username: username,
      abilities: [],
      credential: undefined,
      driver: {
        type: DriverType.memory,
        config: {}
      }
    })
  }

  signOut (): Promise<boolean> {
    return Promise.resolve(true)
  }
}
