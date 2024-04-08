import GameRepository from '../../Domain/Game/GameRepository.ts'
import Game from '../../Domain/Game/Game.ts'
import games from './games.ts'

export default class InMemoryGameRepository implements GameRepository {
  private games: Game[]

  constructor () {
    this.games = games()
  }

  async findById (id: number | string): Promise<Game> {
    const game = this.games.find((game: Game) => game.id === id)
    if (!game) {
      throw new Error('Game not found')
    }
    return Promise.resolve(game)
  }
}
