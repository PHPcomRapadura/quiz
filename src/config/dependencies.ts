import 'reflect-metadata'
import { container } from 'tsyringe'
import { AuthService } from '../app/Application/AuthService.ts'
import SupabaseAuthRepository from '../app/Infrastructure/Supabase/SupabaseAuthRepository.ts'
import HttpAuthRepository from '../app/Infrastructure/Backend/HttpAuthRepository.ts'
import InMemoryGameRepository from '../app/Infrastructure/InMemory/InMemoryGameRepository.ts'
import SupabaseGameRepository from '../app/Infrastructure/Supabase/SupabaseGameRepository.ts'
import { mode } from './env.ts'

const binds: Record<string, Record<string, () => unknown>> = {
  http: {
    AuthRepository: () => HttpAuthRepository.build(),
    // GameRepository: () => HttpGameRepository.build(),
  },
  memory: {
    // AuthRepository: () => new InMemoryAuthRepository(),
    GameRepository: () => new InMemoryGameRepository(),
  },
  supabase: {
    AuthRepository: () => SupabaseAuthRepository.build(),
    GameRepository: () => SupabaseGameRepository.build(),
  },
}

const factory = (token: string): [string, { useFactory: () => unknown }] => {
  const bind = binds[mode()]
  const useFactory = bind[token]
  return [token, { useFactory }]
}

export default function () {
  container.register('AuthService', { useClass: AuthService })
  container.register(...factory('AuthRepository'))
  container.register(...factory('GameRepository'))

  return container
}
