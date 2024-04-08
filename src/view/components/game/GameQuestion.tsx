import { useEffect, useState } from 'react'
import Answer from '../../../app/Domain/Game/Answer.ts'
import { Markdown } from '../general/Markdown.tsx'
import AnswerStatus from '../../../app/Domain/Game/AnswerStatus.ts'
import { Case, Switch } from '../general/Switch.ts'
import { GameWrongAnswer } from './GameWrongAnswer.tsx'
import { GameCorrectAnswer } from './GameCorrectAnswer.tsx'

export type GameQuestionComponentsProps = {
  finishQuestion: () => void
}

export type GameQuestionAnswerQuestion = (status: AnswerStatus) => void

export type GameQuestionProps = {
  text: string
  answers: Answer[]
  answerQuestion: GameQuestionAnswerQuestion
  nextQuestion: () => void
  timeout?: number
}

export function GameQuestion (props: GameQuestionProps) {
  let { timeout, } = props
  const { text, answers, answerQuestion, nextQuestion } = props
  if (!timeout) {
    timeout = 30
  }
  const [timer, setTimer] = useState(timeout)
  const [selected, setSelected] = useState<Answer | null>(null)
  const [status, setStatus] = useState<AnswerStatus>(AnswerStatus.UNANSWERED)

  useEffect(() => {
    const tick = () => {
      if (timer <= 0) {
        clearInterval(interval)
        return
      }
      setTimer(timer - 1)
    }
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [timer])

  const answer = () => {
    const newStatus = selected?.correct ? AnswerStatus.CORRECT : AnswerStatus.WRONG
    setStatus(newStatus)
    answerQuestion(newStatus)
  }

  const finishQuestion = () => {
    setStatus(AnswerStatus.UNANSWERED)
    setSelected(null)
    setTimer(timeout)
    nextQuestion()
  }

  return (
    <div className="pergunta">

      <Switch condition={status}>
        <Case
          value={AnswerStatus.UNANSWERED}
        >
          <h4
            style={{ paddingTop: '20px', paddingBottom: '20px' }}
          >
            <Markdown
              text={text}
              tag="div"
            />
          </h4>
          {
            answers.map((answer, index) => (
              <div
                className="radio"
                key={index}
              >
                <label>
                  <input
                    value={index}
                    type="radio"
                    name="question"
                    onChange={() => setSelected(answer)}
                  />
                  <Markdown text={answer.text} />
                </label>
              </div>
            ))
          }
          <h2
            onClick={() => setTimer(timeout)}
            style={{ cursor: 'pointer' }}
          >
            Tempo restante: {timer}
          </h2>
          <button
            style={{ width: '100%', marginTop: '50px' }}
            className="center-block btn btn-lg btn-primary"
            onClick={answer}
          >
            Responder
          </button>
        </Case>
        <Case value={AnswerStatus.WRONG}>
          <GameWrongAnswer finishQuestion={finishQuestion} />
        </Case>
        <Case value={AnswerStatus.TIME_EXPIRED}>
          <GameWrongAnswer finishQuestion={finishQuestion} />
        </Case>
        <Case value={AnswerStatus.CORRECT}>
          <GameCorrectAnswer finishQuestion={finishQuestion} />
        </Case>
      </Switch>
    </div>
  )
}
