import 'reflect-metadata'
import { container } from 'tsyringe'
import { AuthService } from '../app/Application/AuthService.ts'
import SupabaseAuthRepository from '../app/Infrastructure/Supabase/SupabaseAuthRepository.ts'
import HttpAuthRepository from '../app/Infrastructure/Backend/HttpAuthRepository.ts'
import InMemoryGameRepository from '../app/Infrastructure/InMemory/InMemoryGameRepository.ts'
import SupabaseGameRepository from '../app/Infrastructure/Supabase/SupabaseGameRepository.ts'
import { mode } from './env.ts'

const factory = (binds: Record<string, () => unknown>) => {
  const bind = binds[mode()]
  return bind && bind()
}

export default function () {
  container.register('AuthService', { useClass: AuthService })
  container.register('AuthRepository', {
    useFactory: () => {
      return factory({
        http: () => HttpAuthRepository.build(),
        supabase: () => SupabaseAuthRepository.build(),
      })
    }
  })
  container.register('GameRepository', {
    useFactory: () => factory({
      memory: () => new InMemoryGameRepository(),
      supabase: () => SupabaseGameRepository.build(),
    })
  })

  return container
}
