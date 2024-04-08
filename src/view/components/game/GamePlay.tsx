import { Markdown } from '../general/Markdown.tsx'
import Answer from '../../../app/Domain/Game/Answer.ts'

export type GamePlayProps = {
  text: string
  options: Answer[]
  timer: number
  timeout: number
  setSelected: (answer: Answer) => void
  setTimer: (timeout: number) => void
  confirmSelection: () => void
}

export function GamePlay (props: GamePlayProps) {
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
    <>
      <h4
        style={{ paddingTop: '20px', paddingBottom: '20px' }}
      >
        <Markdown
          text={text}
          tag="div"
        />
      </h4>
      {
        options.map((answer, index) => (
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
        onClick={confirmSelection}
      >
        Responder
      </button>
    </>
  )
}
