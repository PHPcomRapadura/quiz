import Question from './Question.ts'

export default interface Game {
  id?: number | string
  description: string
  author: string | null
  createdAt: Date
  updatedAt: Date
  questions: Question[]
}
