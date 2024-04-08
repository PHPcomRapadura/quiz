import Game from './Game.ts'

export default interface GameRepository {
  paginate(page: number, limit: number): Promise<Game[]>

  findById (id: number | string): Promise<Game>
}
