import { useEffect, useState } from 'react'
import Answer from '../../../app/Domain/Game/Answer.ts'
import AnswerStatus from '../../../app/Domain/Game/AnswerStatus.ts'
import { Case, Switch } from '../general/Switch.ts'
import { GameWrongAnswer } from './GameWrongAnswer.tsx'
import { GameCorrectAnswer } from './GameCorrectAnswer.tsx'
import { GameTimeExpired } from './GameTimeExpired.tsx'
import { shuffle } from '../../../app/Domain/Util.ts'
import { GamePlay } from './GamePlay.tsx'

export type GameQuestionComponentsProps = {
  finishQuestion: () => void
}

export type GameQuestionAnswerQuestion = (status: AnswerStatus) => void

export type GameQuestionProps = {
  text: string
  answers: Answer[]
  answerQuestion: GameQuestionAnswerQuestion
  nextQuestion: () => void
  timeout: number
}

export function GameQuestion (props: GameQuestionProps) {
  const {
    timeout,
    text,
    answers,
    answerQuestion,
    nextQuestion
  } = props

  const [timer, setTimer] = useState(timeout)
  const [selected, setSelected] = useState<Answer | null>(null)
  const [status, setStatus] = useState<AnswerStatus>(AnswerStatus.UNANSWERED)
  const [options, setOptions] = useState<Answer[]>([])

  useEffect(() => {
    if (options.length === 0) {
      setOptions(shuffle(answers))
    }

    const tick = () => {
      if (timer > 0) {
        setTimer(timer - 1)
        return
      }
      if (status === AnswerStatus.UNANSWERED) {
        setStatus(AnswerStatus.TIME_EXPIRED)
        answerQuestion(AnswerStatus.TIME_EXPIRED)
      }
      clearInterval(interval)
    }
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [options, timer, answers, status, answerQuestion])

  const confirmSelection = () => {
    const newStatus = selected?.correct ? AnswerStatus.CORRECT : AnswerStatus.WRONG
    setStatus(newStatus)
    answerQuestion(newStatus)
  }

  const finishQuestion = () => {
    setStatus(AnswerStatus.UNANSWERED)
    setSelected(null)
    setTimer(timeout)
    setOptions([])
    nextQuestion()
  }

  return (
    <div className="pergunta">

      <Switch condition={status}>
        <Case
          value={AnswerStatus.UNANSWERED}
        >
          <GamePlay
            text={text}
            options={options}
            timer={timer}
            timeout={timeout}
            setSelected={setSelected}
            setTimer={setTimer}
            confirmSelection={confirmSelection}
          />
        </Case>
        <Case value={AnswerStatus.WRONG}>
          <GameWrongAnswer finishQuestion={finishQuestion} />
        </Case>
        <Case value={AnswerStatus.TIME_EXPIRED}>
          <GameTimeExpired finishQuestion={finishQuestion} />
        </Case>
        <Case value={AnswerStatus.CORRECT}>
          <GameCorrectAnswer finishQuestion={finishQuestion} />
        </Case>
      </Switch>
    </div>
  )
}
