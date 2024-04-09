import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Done } from '../../components/game/GameImage.tsx'

export function GameEndPage () {
  const params = useParams()
  const gameId = Number(params.id)
  const navigate = useNavigate()
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.game.end' }
  )
  return (
    <>
      <Done />
      <div className="pt-1 pb-2">
        <h1 className="text-center">{t('title')}</h1>
        <p className="text-center">{t('description')}</p>
      </div>
      <div className="d-grid">
        <button
          className="btn btn-lg btn-primary"
          onClick={() => navigate(`/game/${gameId}/play`)}
        >
          {t('restart')}
        </button>
      </div>
    </>
  )
}
