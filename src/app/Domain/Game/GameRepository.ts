import Game from './Game.ts'

export default interface GameRepository {
  findById (id: number | string): Promise<Game>
}
