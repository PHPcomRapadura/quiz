import { useEffect, useState } from 'react'

import Question from '../../../app/Domain/Game/Question.ts'
import AnswerStatus from '../../../app/Domain/Game/AnswerStatus.ts'
import { shuffle } from '../../../app/Domain/Util.ts'
import Game from '../../../app/Domain/Game/Game.ts'

import { GamePlaySessionInstruction } from './game-play-session/GamePlaySessionInstruction.tsx'
import { GamePlaySessionQuestion, GameQuestionAnswerQuestion } from './game-play-session/GamePlaySessionQuestion.tsx'
import { Case, Switch } from '../general/Switch.tsx'
import { Loading } from '../general/Loading.tsx'
import { Warning } from '../general/Alert.tsx'

export type GamePlaySessionProps = {
  game: Game,
  onStart?: () => void,
  onFinish?: () => void
}

enum GamePlaySessionStatus {
  WAITING,
  READY,
  STARTED,
  FINISHED,
}

export function GamePlaySession ({ game, onStart, onFinish }: GamePlaySessionProps) {
  const timeout = Number(import.meta.env.VITE_GAME_QUESTION_TIMEOUT || 30)
  const [status, setStatus] = useState<GamePlaySessionStatus>(GamePlaySessionStatus.WAITING)
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
    onStart && onStart()
    nextQuestion()
    setStatus(GamePlaySessionStatus.STARTED)
  }

  const finishGame = () => {
    setCurrentQuestion(null)
    onFinish && onFinish()
    setStatus(GamePlaySessionStatus.FINISHED)
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
    if (status !== GamePlaySessionStatus.WAITING) {
      return
    }
    setQuestions(shuffle<Question>(game.questions))
    setStatus(GamePlaySessionStatus.READY)
  }, [status, game, questions])

  return (
    <Switch condition={status}>
      <Case value={GamePlaySessionStatus.WAITING}>
        <Loading />
      </Case>
      <Case value={GamePlaySessionStatus.READY}>
        <GamePlaySessionInstruction
          timeout={timeout}
          game={game}
          nextQuestion={startGame}
        />
      </Case>
      <Case value={GamePlaySessionStatus.STARTED}>
        <GamePlaySessionQuestion
          timeout={timeout}
          text={currentQuestion?.text || ''}
          answers={currentQuestion?.answers || []}
          answerQuestion={answerQuestion}
          nextQuestion={nextQuestion}
        />
      </Case>
      <Case value={GamePlaySessionStatus.FINISHED}>
        <Warning />
      </Case>
    </Switch>
  )
}
