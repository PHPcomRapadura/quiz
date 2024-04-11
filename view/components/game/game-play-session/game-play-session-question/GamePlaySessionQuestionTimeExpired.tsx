import { GameQuestionComponentsProps } from '../GamePlaySessionQuestion.tsx'
import { Drink } from '../../GameImage.tsx'
import { useTranslation } from 'react-i18next'

export function GamePlaySessionQuestionTimeExpired ({ finishQuestion }: GameQuestionComponentsProps) {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.game.play.session' }
  )
  return (
    <>
      <Drink />
      <div className="pt-1 pb-2">
        <h1 className="text-center"> {t('expired.title')}</h1>
        <p className="text-center">{t('expired.description')}</p>
      </div>
      <div className="d-grid">
        <button
          className="btn btn-lg btn-primary"
          onClick={finishQuestion}
        >
          {t('next')}
        </button>
      </div>
    </>
  )
}
