import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import GameRepository from '../../../app/Domain/Game/GameRepository.ts'
import Game from '../../../app/Domain/Game/Game.ts'
import Question from '../../../app/Domain/Game/Question.ts'

import { useApp } from '../../hooks'
import { GameQuestion, GameQuestionAnswerQuestion } from '../../components/game/GameQuestion.tsx'
import AnswerStatus from '../../../app/Domain/Game/AnswerStatus.ts'

export function GamePage () {
  const params = useParams()
  const gameId = Number(params.id)
  const { container } = useApp()

  const [game, setGame] = useState<Game | null>(null)
  const [fetched, setFetched] = useState(false)
  const gameRepository = container.resolve<GameRepository>('GameRepository')

  const [questions, setQuestions] = useState<Question[]>([])
  const [question, setQuestion] = useState<Question | null>(null)

  const nextQuestion = () => {
    if (questions.length === 0) {
      return
    }
    const current = Math.floor(Math.random() * questions.length)
    setQuestion(questions[current])
    setQuestions(questions.filter((_, index) => index !== current))
  }

  const answerQuestion: GameQuestionAnswerQuestion = (status) => {
    // TODO: prepare actions for each result
    const actions = {
      [AnswerStatus.CORRECT]: () => console.log('Correct!'),
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
        <GameQuestion
          timeout={30}
          text={question.text}
          answers={question.answers}
          answerQuestion={answerQuestion}
          nextQuestion={nextQuestion}
        />
        :
        <div>
          <h1 className="text-center">Agora o bicho vai pegar!</h1>
          <p className="text-center">
            Certifique-se de que todos estão prontos para começar e clique em Começar!
          </p>
          <button
            onClick={nextQuestion}
            style={{ width: '100%', marginTop: '50px' }}
            className="center-block btn btn-lg btn-primary"
          >
            Começar
          </button>
        </div>
    )
    :
    (
      fetched ?
        <div>Error fetching game {gameId} ...</div>
        :
        <div>Fetching game {gameId} ...</div>
    )
}
