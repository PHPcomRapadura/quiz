import { useTranslation } from 'react-i18next'
import Game from '../../../app/Domain/Game/Game.ts'

export type GameInstructionProps = {
  timeout: number,
  game: Game,
  nextQuestion: () => void
}

export function GameInstruction (props: GameInstructionProps) {
  const { timeout, game, nextQuestion } = props
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.game.play' }
  )
  return (
    <div>
      <h1 className="text-center">{t('title', { name: game.description })}</h1>
      <p className="text-center">
        {t('description', { timeout, total: game.questions.length })}
      </p>
      <h4>{t('greetings')}</h4>
      <button
        onClick={nextQuestion}
        style={{ width: '100%', marginTop: '50px' }}
        className="center-block btn btn-lg btn-primary"
      >
        {t('start')}
      </button>
    </div>
  )
}
