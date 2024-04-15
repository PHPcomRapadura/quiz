import { useEffect, useState } from 'react'

import Question from '../../../src/Domain/Game/Question.ts'
import AnswerStatus from '../../../src/Domain/Game/AnswerStatus.ts'
import { shuffle } from '../../../src/Domain/Util.ts'
import Game from '../../../src/Domain/Game/Game.ts'

import { GamePlaySessionInstruction } from './game-play-session/GamePlaySessionInstruction.tsx'
import { GamePlaySessionQuestion, GameQuestionAnswerQuestion } from './game-play-session/GamePlaySessionQuestion.tsx'
import { Case, Match } from '../general/Conditional.tsx'
import { Loading } from '../general/Loading.tsx'
import { AlertWarning } from '../general/Alert.tsx'

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
  const [interaction, setInteraction] = useState<number>(0)

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
    setInteraction(interaction + 1)
  }

  useEffect(() => {
    if (status !== GamePlaySessionStatus.WAITING) {
      return
    }
    setQuestions(shuffle<Question>(game.questions))
    setStatus(GamePlaySessionStatus.READY)
  }, [status, game, questions])

  return (
    <Match condition={status}>
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
        <div className="progress opacity-50 mb-1">
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${((game.questions.length - questions.length) / game.questions.length) * 100}%` }}
          />
        </div>
        <GamePlaySessionQuestion
          timeout={timeout}
          text={currentQuestion?.text || ''}
          answers={currentQuestion?.answers || []}
          answerQuestion={answerQuestion}
          nextQuestion={nextQuestion}
        />
        <div className="mt-1">
          <small>{game.questions.length - questions.length} / {game.questions.length} ({interaction})</small>
          &nbsp;
          {
            game.questions.length - questions.length === game.questions.length ?
              <span className="badge bg-success">&hearts;</span> :
              interaction > (game.questions.length - questions.length) ?
                <span className="badge bg-warning">&lambda;</span> :
                ''
          }
        </div>
      </Case>
      <Case value={GamePlaySessionStatus.FINISHED}>
        <AlertWarning />
      </Case>
    </Match>
  )
}
