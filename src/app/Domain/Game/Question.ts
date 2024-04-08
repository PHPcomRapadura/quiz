import Answer from './Answer.ts'

export default interface Question {
  id?: number | string
  text: string
  createdAt: Date
  updatedAt: Date
  answers: Answer[]
}
