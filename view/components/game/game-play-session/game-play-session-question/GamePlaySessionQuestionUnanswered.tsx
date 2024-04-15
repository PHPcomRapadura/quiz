import Answer from '../../../../../src/Domain/Game/Answer.ts'

import { Markdown } from '../../../general/Markdown.tsx'
import { useI18n } from '../../../../hooks'

export type GameQuestionOptionsProps = {
  text: string
  options: Answer[]
  timer: number
  timeout: number
  setSelected: (answer: Answer) => void
  setTimer: (timeout: number) => void
  confirmSelection: () => void
}

export function GamePlaySessionQuestionUnanswered (props: GameQuestionOptionsProps) {
  const $t = useI18n('pages.game.play.session')
  const {
    text,
    options,
    setSelected,
    setTimer,
    timer,
    timeout,
    confirmSelection
  } = props

  return (
    <div className="GamePlaySessionQuestionUnanswered">
      <div className="card mb-2">
        <div className="card-header">
          <h4>
            <Markdown
              tag="div"
              text={text}
            />
          </h4>
        </div>
        <div className="card-body">
          {
            options.map((answer, index) => (
              <div
                key={index}
                className="form-check"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="question"
                  id={`question_${index}`}
                  onChange={() => setSelected(answer)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`question_${index}`}
                >
                  <Markdown text={answer.text} />
                </label>
              </div>
            ))
          }
        </div>
        <div className="card-footer">
          <span
            className="h3"
            onClick={() => setTimer(timeout)}
          >
            {$t('unanswered.timer', { time: timer })}
          </span>
        </div>
      </div>

      <div className="d-grid">
        <button
          className="btn btn-lg btn-primary"
          onClick={confirmSelection}
        >
          {$t('answer')}
        </button>
      </div>
    </div>
  )
}
