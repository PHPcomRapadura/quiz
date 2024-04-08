import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { image } from '../../../config/assets.ts'

export function GameEndPage () {
  const params = useParams()
  const gameId = Number(params.id)
  const navigate = useNavigate()
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.game.end' }
  )
  return (
    <div
      className="end"
    >
      <img
        style={{ width: '80%' }}
        className="center-block"
        src={image('/phpinga.png')}
        alt="PHPinga"
      />
      <h1 className="text-center">{t('title')}</h1>
      <p className="text-center">{t('description')}</p>
      <button
        style={{ width: '100%', marginTop: '50px' }}
        className="center-block btn btn-lg btn-primary"
        onClick={() => navigate(`/game/${gameId}/play`)}
      >
        {t('restart')}
      </button>
    </div>
  )
}
