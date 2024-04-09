import { useEffect, useState } from 'react'

import Question from '../../../app/Domain/Game/Question.ts'
import AnswerStatus from '../../../app/Domain/Game/AnswerStatus.ts'
import { shuffle } from '../../../app/Domain/Util.ts'
import Game from '../../../app/Domain/Game/Game.ts'

import { GamePlaySessionInstruction } from './game-play-session/GamePlaySessionInstruction.tsx'
import { GamePlaySessionQuestion, GameQuestionAnswerQuestion } from './game-play-session/GamePlaySessionQuestion.tsx'

export type GamePlaySessionProps = {
  game: Game,
  onStart?: () => void,
  onFinish?: () => void
}

export function GamePlaySession ({ game, onStart, onFinish }: GamePlaySessionProps) {
  const timeout = 1000000
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)

  const nextQuestion = () => {
    if (questions.length === 0) {
      finishGame()
      return
    }
    const randomIndex = Math.floor(Math.random() * questions.length)
    const newQuestion = questions[randomIndex]
    setCurrentQuestion(newQuestion)
  }

  const startGame = () => {
    nextQuestion()
    onStart && onStart()
  }

  const finishGame = () => {
    setCurrentQuestion(null)
    onFinish && onFinish()
  }

  const answerQuestion: GameQuestionAnswerQuestion = (status) => {
    // TODO: improve actions for each result
    const actions = {
      [AnswerStatus.CORRECT]: () => {
        console.log('Correct!')
        const current = questions.findIndex((q) => q === currentQuestion)
        const newQuestions = questions.filter((_, index) => index !== current)
        setQuestions(shuffle<Question>(newQuestions))
      },
      [AnswerStatus.WRONG]: () => console.log('Wrong!'),
      [AnswerStatus.UNANSWERED]: () => console.log('Unanswered!'),
      [AnswerStatus.TIME_EXPIRED]: () => console.log('Time expired!'),
    }
    actions[status]()
  }

  useEffect(() => {
    if (questions.length > 0) {
      return
    }
    setQuestions(shuffle<Question>(game.questions))
  }, [game, questions])

  return !currentQuestion ?
    <GamePlaySessionInstruction
      timeout={timeout}
      game={game}
      nextQuestion={startGame}
    /> :
    <>
      <GamePlaySessionQuestion
        timeout={timeout}
        text={currentQuestion.text}
        answers={currentQuestion.answers}
        answerQuestion={answerQuestion}
        nextQuestion={nextQuestion}
      />
      <div className="pt-1">
        <small>{game.questions.length - questions.length} / {game.questions.length}</small>
      </div>
    </>
}
