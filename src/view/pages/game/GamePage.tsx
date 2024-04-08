import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
  const [fetched, setFetched] = useState(false)
  const gameRepository = container.resolve<GameRepository>('GameRepository')

  const [questions, setQuestions] = useState<Question[]>([])
  const [question, setQuestion] = useState<Question | null>(null)

  const nextQuestion = () => {
    if (questions.length === 0) {
      setQuestion(null)
      navigate(`/game/${gameId}/end`)
      return
    }
    const current = Math.floor(Math.random() * questions.length)
    setQuestion(questions[current])
  }

  const answerQuestion: GameQuestionAnswerQuestion = (status) => {
    // TODO: prepare actions for each result
    const actions = {
      [AnswerStatus.CORRECT]: () => {
        console.log('Correct!')
        const current = questions.findIndex((q) => q === question)
        const newQuestions = questions.filter((_, index) => index !== current)
        console.log('newQuestions', newQuestions)
        setQuestions(shuffle<Question>(newQuestions))
      },
      [AnswerStatus.WRONG]: () => console.log('Wrong!'),
      [AnswerStatus.UNANSWERED]: () => console.log('Unanswered!'),
      [AnswerStatus.TIME_EXPIRED]: () => console.log('Time expired!'),
    }
    actions[status]()
  }

  useEffect(() => {
    if (fetched) {
      return
    }

    const fetchGame = async () => {
      const game = await gameRepository.findById(gameId)
      setGame(game)
      setFetched(true)
      setQuestions(JSON.parse(JSON.stringify(game.questions)))
    }
    fetchGame()
  }, [fetched, gameId, gameRepository])

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
      fetched ?
        <div>Error fetching game {gameId} ...</div>
        :
        <div>Fetching game {gameId} ...</div>
    )
}
