import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Done } from '../../components/game/GameImage.tsx'
import { useEffect, useState } from 'react'

export function GameEndPage () {
  const params = useParams()
  const gameId = Number(params.id)
  const navigate = useNavigate()
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.game.end' }
  )
  const [timer, setTimer] = useState(5)

  useEffect(() => {
    const handler = () => {
      if (timer > 0) {
        setTimer((prev) => prev - 1)
        return
      }
      clearInterval(interval)
    }
    const interval = setInterval(handler, 1000)
    return () => clearInterval(interval)
  }, [timer, setTimer])

  return (
    <div className="card bg-secondary py-3 px-4 rounded">
      <Done />
      <div className="pt-1 pb-2">
        <h1 className="text-center">{t('title')}</h1>
        <p className="text-center">{t('description')}</p>
      </div>
      <div className="d-grid">
        <button
          className="btn btn-lg btn-primary"
          onClick={() => navigate(`/game/${gameId}/play`)}
          disabled={timer > 0}
        >
          {timer > 0 ? t('waiting', { timer }) : t('restart')}
        </button>
      </div>
    </div>
  )
}
