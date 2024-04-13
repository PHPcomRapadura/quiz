import 'reflect-metadata'
import { container } from 'tsyringe'

import { Data, Driver, DriverResolver, DriverType } from '../src/Domain/Contracts.ts'

import { AuthService } from '../src/Application/Auth/AuthService.ts'
import SupabaseAuthRepository from '../src/Infrastructure/Supabase/SupabaseAuthRepository.ts'
import HttpAuthRepository from '../src/Infrastructure/Http/HttpAuthRepository.ts'
import InMemoryGameRepository from '../src/Infrastructure/Memory/InMemoryGameRepository.ts'
import SupabaseGameRepository from '../src/Infrastructure/Supabase/SupabaseGameRepository.ts'
import InMemoryAuthRepository from '../src/Infrastructure/Memory/InMemoryAuthRepository.ts'

import { getInheritDriver, getSessionDriver, isDevelopmentMode } from './env.ts'

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
  const useFactory = () => {
    if (!driver) {
      driver = getSessionDriver()
    }
    const bind = binds[driver.type]
    const maker = bind[token]
    return maker(driver.config)
  }
  return [token, { useFactory }]
}

export default function () {
  // [begin] structure stuff
  container.register('AuthService', { useClass: AuthService })

  let authDriver: Driver = getInheritDriver()
  if (isDevelopmentMode()) {
    authDriver = {
      type: DriverType.memory,
      config: {}
    }
  }
  container.register(...factory('AuthRepository', authDriver))
  // [end] structure stuff

  // game stuff
  container.register(...factory('GameRepository'))

  return container
}
