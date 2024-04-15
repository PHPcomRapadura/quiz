import { useI18n } from '../../../../hooks'

import { Drink } from '../../GameImage.tsx'
import { GameQuestionComponentsProps } from '../GamePlaySessionQuestion.tsx'

export function GamePlaySessionQuestionWrong ({ finishQuestion }: GameQuestionComponentsProps) {
  const $t = useI18n('pages.game.play.session')
  return (
    <>
      <Drink />
      <div className="pt-1 pb-2">
        <h1 className="text-center"> {$t('wrong.title')}</h1>
        <p className="text-center">{$t('wrong.description')}</p>
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
