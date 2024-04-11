import 'reflect-metadata'
import { container } from 'tsyringe'

import { DriverResolver, Data, DriverType } from '../src/Domain/Contracts.ts'

import { AuthService } from '../src/Application/AuthService.ts'
import SupabaseAuthRepository from '../src/Infrastructure/Supabase/SupabaseAuthRepository.ts'
import HttpAuthRepository from '../src/Infrastructure/Http/HttpAuthRepository.ts'
import InMemoryGameRepository from '../src/Infrastructure/Memory/InMemoryGameRepository.ts'
import SupabaseGameRepository from '../src/Infrastructure/Supabase/SupabaseGameRepository.ts'
import InMemoryAuthRepository from '../src/Infrastructure/Memory/InMemoryAuthRepository.ts'

import { loadedDriver } from './env.ts'

const binds: DriverResolver = {
  [DriverType.http]: {
    AuthRepository: () => HttpAuthRepository.build(),
    // GameRepository: (config: Data) => HttpGameRepository.build(),
  },
  [DriverType.memory]: {
    AuthRepository: () => new InMemoryAuthRepository(),
    GameRepository: () => new InMemoryGameRepository(),
  },
  [DriverType.supabase]: {
    AuthRepository: (config: Data) => SupabaseAuthRepository.build(config),
    GameRepository: (config: Data) => SupabaseGameRepository.build(config),
  },
}

const factory = (token: string): [string, { useFactory: () => unknown }] => {
  const driver = loadedDriver()
  const bind = binds[driver.type]
  const useFactory = bind[token]
  return [token, { useFactory: () => useFactory(driver.config) }]
}

export default function () {
  container.register('AuthService', { useClass: AuthService })
  container.register(...factory('AuthRepository'))
  container.register(...factory('GameRepository'))

  return container
}
