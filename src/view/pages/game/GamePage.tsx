import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import GameRepository from '../../../app/Domain/Game/GameRepository.ts'
import Game from '../../../app/Domain/Game/Game.ts'
import Question from '../../../app/Domain/Game/Question.ts'

import { useApp } from '../../hooks'
import { GameQuestion, GameQuestionAnswerQuestion } from '../../components/game/GameQuestion.tsx'
import AnswerStatus from '../../../app/Domain/Game/AnswerStatus.ts'
import { GameInstruction } from '../../components/game/GameInstruction.tsx'
import { shuffle } from '../../../app/Domain/Util.ts'

export function GamePage () {
  const timeout = 30
  const params = useParams()
  const gameId = Number(params.id)
  const { container } = useApp()
  const navigate = useNavigate()

  const [game, setGame] = useState<Game | null>(null)
  const [initialized, setInitialized] = useState(false)
  const fetched = useRef(false)
  const gameRepository = container.resolve<GameRepository>('GameRepository')

  const [questions, setQuestions] = useState<Question[]>([])
  const [question, setQuestion] = useState<Question | null>(null)

  const nextQuestion = () => {
    if (questions.length === 0) {
      setQuestion(null)
      navigate(`/game/${gameId}/end`)
      return
    }
    const randomIndex = Math.floor(Math.random() * questions.length)
    const newQuestion = questions[randomIndex]
    setQuestion(newQuestion)
  }

  const answerQuestion: GameQuestionAnswerQuestion = (status) => {
    // TODO: improve actions for each result
    const actions = {
      [AnswerStatus.CORRECT]: () => {
        console.log('Correct!')
        const current = questions.findIndex((q) => q === question)
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
    if (initialized) {
      return
    }

    const fetchGame = async () => {
      if (fetched.current) {
        return
      }
      try {
        fetched.current = true
        const game = await gameRepository.findById(gameId)
        setGame(game)
        setInitialized(true)
        setQuestions(JSON.parse(JSON.stringify(game.questions)))
      } catch (e) {
        console.error(e)
        return navigate(`/game/${gameId}/not-found`)
      }
    }
    fetchGame()
  }, [navigate, initialized, gameId, gameRepository])

  return game ?
    (
      question ?
        <>
          <GameQuestion
            timeout={timeout}
            text={question.text}
            answers={question.answers}
            answerQuestion={answerQuestion}
            nextQuestion={nextQuestion}
          />
          <div style={{ paddingTop: '14px' }}>
            <small>{game.questions.length - questions.length} / {game.questions.length}</small>
          </div>
        </>
        :
        <GameInstruction
          timeout={timeout}
          game={game}
          nextQuestion={nextQuestion}
        />
    )
    :
    (
      // TODO: add loading and error states
      initialized ?
        <div>Error fetching game {gameId} ...</div>
        :
        <div>Fetching game {gameId} ...</div>
    )
}
