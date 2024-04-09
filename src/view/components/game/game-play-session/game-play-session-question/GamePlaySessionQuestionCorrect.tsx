import { GameQuestionComponentsProps } from '../GamePlaySessionQuestion.tsx'
import { Celebrate } from '../../GameImage.tsx'
import { useTranslation } from 'react-i18next'

export function GamePlaySessionQuestionCorrect ({ finishQuestion }: GameQuestionComponentsProps) {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.game.play.session' }
  )
  return (
    <>
      <Celebrate />
      <h1 className="text-center"> {t('correct.title')}</h1>
      <p className="text-center">{t('correct.description')}</p>
      <button
        style={{ width: '100%', marginTop: '50px' }}
        className="center-block btn btn-lg btn-primary"
        onClick={finishQuestion}
      >
        {t('next')}
      </button>
    </>
  )
}
