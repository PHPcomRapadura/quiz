import GameRepository from '../../Domain/Game/GameRepository.ts'
import Game from '../../Domain/Game/Game.ts'
import games from './games.ts'

export default class InMemoryGameRepository implements GameRepository {
  private games: Game[]

  constructor () {
    this.games = games()
  }

  async promisify <T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      const handler = () => resolve(data)
      window.setTimeout(handler, 300)
    })
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
