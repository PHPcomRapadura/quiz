import SupabaseRepository from '../Driver/Supabase/SupabaseRepository.ts'

import GameRepository from '../../Domain/Game/GameRepository.ts'
import { Data } from '../../Domain/Contracts.ts'
import Game from '../../Domain/Game/Game.ts'

import GameMapper from './Mapper/GameMapper.ts'

export default class SupabaseGameRepository extends SupabaseRepository implements GameRepository {
  constructor (
    private mapper: GameMapper,
    config: Data
  ) {
    super(config)
  }

  static build (config: Data) {
    return new this(new GameMapper(), config)
  }

  async paginate (page: number, limit: number): Promise<Game[]> {
    const from = (page - 1) * limit
    const { data, error } = await this.driver
      .from('games')
      .select(`id,
          description,  
          author,
          created_at,  
          updated_at,  
          questions (
            id,
            text,
            created_at,
            updated_at,
            answers (
              id,
              text,
              correct,
              created_at
            )
          )`
      )
      .range(from, limit)
    if (error) {
      throw new Error(error.message)
    }
    return data.map((game) => this.mapper.map(game))
  }

  async findById (id: number | string): Promise<Game> {
    const { data, error } = await this.driver
      .from('games')
      .select(`id,
          description,  
          author,
          created_at,  
          updated_at,  
          questions (
            id,
            text,
            created_at,
            updated_at,
            answers (
              id,
              text,
              correct,
              created_at
            )
          )`
      )
      .eq('id', id)
      .single()
    if (!data) {
      throw new Error(error?.message || 'Game not found')
    }
    return Promise.resolve(this.mapper.map(data))
  }
}
