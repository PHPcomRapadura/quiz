import GameRepository from '../../Domain/Game/GameRepository.ts'
import Game from '../../Domain/Game/Game.ts'
import games from './games.ts'
import InMemoryRepository from '../Driver/Memory/InMemoryRepository.ts'

export default class InMemoryGameRepository extends InMemoryRepository implements GameRepository {
  private games: Game[]

  constructor () {
    super()
    this.games = games()
  }

  async paginate (page: number, limit: number): Promise<Game[]> {
    return this.promisify(this.games.slice((page - 1) * limit, page * limit))
  }

  async findById (id: number | string): Promise<Game> {
    const game = this.games.find((game: Game) => game.id === id)
    if (!game) {
      throw new Error('Game not found')
    }
    return this.promisify(game)
  }
}
