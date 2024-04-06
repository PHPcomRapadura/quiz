import 'reflect-metadata'
import { container } from 'tsyringe'
import { AuthService } from '../app/Application/AuthService.ts'
import JsonHttpAuthRepository from '../app/Infrastructure/Http/JsonHttpAuthRepository.ts'

export default function () {
  container.register('AuthService', { useClass: AuthService })
  container.register('AuthRepository', { useClass: JsonHttpAuthRepository })

  return container
}
