import { injectable } from 'tsyringe'

/* eslint-disable @typescript-eslint/no-explicit-any */
@injectable()
export default class GameMapper {
  map (data: any) {
    return {
      id: data.id,
      description: data.description,
      author: data.author,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      questions: data.questions.map((question: any) => ({
        id: question.id,
        text: question.text,
        createdAt: question.created_at,
        updatedAt: question.updated_at,
        answers: question.answers.map((answer: any) => ({
          id: answer.id,
          text: answer.text,
          correct: answer.correct,
          createdAt: answer.created_at
        }))
      }))
    }
  }
}
