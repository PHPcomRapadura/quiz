import { SupabaseClient } from '@supabase/supabase-js'

import Game from '../../Domain/Game/Game.ts'
import GameRepository from '../../Domain/Game/GameRepository.ts'
import SupabaseClientFactory from './SupabaseClientFactory.ts'
import GameMapper from './Mapper/GameMapper.ts'

export default class SupabaseGameRepository implements GameRepository {
  private supabase: SupabaseClient

  constructor (
    private mapper: GameMapper,
    supabaseClientFactory: SupabaseClientFactory
  ) {
    this.supabase = supabaseClientFactory.make()
  }

  static build () {
    return new this(new GameMapper(), new SupabaseClientFactory())
  }

  async paginate (page: number, limit: number): Promise<Game[]> {
    const from = (page - 1) * limit
    const { data, error } = await this.supabase
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
    const { data, error } = await this.supabase
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
