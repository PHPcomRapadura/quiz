import Game from '../../Domain/Game/Game.ts'
import GameRepository from '../../Domain/Game/GameRepository.ts'
import { SupabaseClient } from '@supabase/supabase-js'
import SupabaseClientFactory from './SupabaseClientFactory.ts'

export default class SupabaseGameRepository implements GameRepository {
  private supabase: SupabaseClient

  constructor () {
    this.supabase = SupabaseClientFactory()
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
    return Promise.resolve({
      id: data.id,
      description: data.description,
      author: data.author,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      questions: data.questions.map((question) => ({
        id: question.id,
        text: question.text,
        createdAt: question.created_at,
        updatedAt: question.updated_at,
        answers: question.answers.map((answer) => ({
          id: answer.id,
          text: answer.text,
          correct: answer.correct,
          createdAt: answer.created_at
        }))
      }))
    })
  }
}
