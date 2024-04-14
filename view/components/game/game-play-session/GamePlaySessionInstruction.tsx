import Game from '../../../../src/Domain/Game/Game.ts'
import { AlertPrimary } from '../../general/Alert.tsx'
import { useI18n } from '../../../hooks/useI18n.ts'

export type GameInstructionProps = {
  timeout: number,
  game: Game,
  nextQuestion: () => void
}

export function GamePlaySessionInstruction (props: GameInstructionProps) {
  const { timeout, game, nextQuestion } = props
  const $t = useI18n('pages.game.play.instructions')
  return (
    <div>
      <div className="pt-1 pb-2">
        <h1 className="text-center">{$t('title')}</h1>
        <AlertPrimary>
          {$t('selected')} <strong>{game.description}</strong>
        </AlertPrimary>
        <p className="text-center">
          {$t('description', { timeout, total: game.questions.length })}
        </p>
        <h4>{$t('greetings')}</h4>
      </div>
      <div className="d-grid">
        <button
          onClick={nextQuestion}
          className="btn btn-lg btn-primary"
        >
          {$t('start')}
        </button>
      </div>
    </div>
  )
}
