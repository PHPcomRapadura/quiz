import GameRepository from '../../Domain/Game/GameRepository.ts'
import Game from '../../Domain/Game/Game.ts'
import { HttpClientDriverContract } from '../Driver/Http/Contracts.ts'
import HttpClientFactory from '../Driver/Http/HttpClientFactory.ts'
import { Status } from '../../Domain/Contracts.ts'

export default class HttpGameRepository implements GameRepository {
  private http: HttpClientDriverContract

  constructor (factory: HttpClientFactory) {
    this.http = factory.make()
  }

  static build () {
    return new this(new HttpClientFactory())
  }

  async findById (id: number | string): Promise<Game> {
    const response = await this.http.get(`/api/v1/games/${id}`)
    if (response.status !== Status.success) {
      throw new Error(response.message)
    }
    return response.data as unknown as Game
  }

  async paginate (page: number, limit: number): Promise<Game[]> {
    const response = await this.http.get(`/api/v1/games?page=${page}&limit=${limit}`)
    if (response.status !== Status.success) {
      throw new Error(response.message)
    }
    return response.data as unknown as Game[]
  }
}
