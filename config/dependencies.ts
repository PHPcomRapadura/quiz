import 'reflect-metadata'
import { container } from 'tsyringe'
import { AuthService } from '../src/Application/AuthService'
import JsonHttpAuthRepository from '../src/Infrastructure/Http/JsonHttpAuthRepository'

export default function () {
  container.register('AuthService', { useClass: AuthService })
  container.register('AuthRepository', { useClass: JsonHttpAuthRepository })

  return container
}
