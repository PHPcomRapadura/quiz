import 'reflect-metadata'
import { container } from 'tsyringe'
import { AuthService } from '../app/Application/AuthService.ts'
// import SupabaseAuthRepository from '../app/Infrastructure/Supabase/SupabaseAuthRepository.ts'
import JsonHttpAuthRepository from '../app/Infrastructure/Http/JsonHttpAuthRepository.ts'
import InMemoryGameRepository from '../app/Infrastructure/InMemory/InMemoryGameRepository.ts'
import SupabaseGameRepository from '../app/Infrastructure/Supabase/SupabaseGameRepository.ts'

export default function () {
  container.register('AuthService', { useClass: AuthService })
  container.register('AuthRepository', { useClass: JsonHttpAuthRepository })
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    container.register('GameRepository', { useClass: InMemoryGameRepository })
    return container
  }
  container.register('GameRepository', {
    useFactory: () => SupabaseGameRepository.build()
  })

  return container
}
