import 'reflect-metadata'
import { container } from 'tsyringe'

import { Data, Driver, DriverResolver, DriverType } from '../src/Domain/Contracts.ts'

import { AuthService } from '../src/Application/AuthService.ts'
import SupabaseAuthRepository from '../src/Infrastructure/Supabase/SupabaseAuthRepository.ts'
import HttpAuthRepository from '../src/Infrastructure/Http/HttpAuthRepository.ts'
import InMemoryGameRepository from '../src/Infrastructure/Memory/InMemoryGameRepository.ts'
import SupabaseGameRepository from '../src/Infrastructure/Supabase/SupabaseGameRepository.ts'
import InMemoryAuthRepository from '../src/Infrastructure/Memory/InMemoryAuthRepository.ts'

import { driverDefault, loadedDriver } from './env.ts'

const binds: DriverResolver = {
  [DriverType.memory]: {
    AuthRepository: () => new InMemoryAuthRepository(),
    GameRepository: () => new InMemoryGameRepository(),
  },
  [DriverType.http]: {
    AuthRepository: () => HttpAuthRepository.build(),
    // GameRepository: (config: Data) => HttpGameRepository.build(),
  },
  [DriverType.supabase]: {
    AuthRepository: (config: Data) => SupabaseAuthRepository.build(config),
    GameRepository: (config: Data) => SupabaseGameRepository.build(config),
  },
}

const factory = (token: string, driver?: Driver): [string, { useFactory: () => unknown }] => {
  if (!driver) {
    driver = loadedDriver()
  }
  const bind = binds[driver.type]
  const useFactory = bind[token]
  return [token, { useFactory: () => useFactory(driver.config) }]
}

export default function () {
  // structure stuff
  container.register('AuthService', { useClass: AuthService })
  if (import.meta.env.VITE_DEVELOPMENT_MODE === 'true') {
    container.register(...factory('AuthRepository'))
  }
  container.register(...factory('AuthRepository', driverDefault))

  // game stuff
  container.register(...factory('GameRepository'))

  return container
}
