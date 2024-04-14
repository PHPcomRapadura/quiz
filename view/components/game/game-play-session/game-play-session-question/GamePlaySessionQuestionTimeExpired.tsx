import { useI18n } from '../../../../hooks/useI18n.ts'

import { GameQuestionComponentsProps } from '../GamePlaySessionQuestion.tsx'
import { Drink } from '../../GameImage.tsx'

export function GamePlaySessionQuestionTimeExpired ({ finishQuestion }: GameQuestionComponentsProps) {
  const $t = useI18n('pages.game.play.session')
  return (
    <>
      <Drink />
      <div className="pt-1 pb-2">
        <h1 className="text-center"> {$t('expired.title')}</h1>
        <p className="text-center">{$t('expired.description')}</p>
      </div>
      <div className="d-grid">
        <button
          className="btn btn-lg btn-primary"
          onClick={finishQuestion}
        >
          {$t('next')}
        </button>
      </div>
    </>
  )
}
