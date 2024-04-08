import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function GameWelcomePage () {
  const navigate = useNavigate()
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.game.welcome' }
  )
  // TODO: request the games list from the backend
  return (
    <div
      className="welcome"
    >
      <h1 className="text-center">{t('title')}</h1>
      <p className="text-center">{t('description')}</p>
      <button
        onClick={() => navigate('/game/1/play')}
        style={{ width: '100%', marginTop: '50px' }}
        className="center-block btn btn-lg btn-primary"
      >
        {t('callToAction')}
      </button>
    </div>
  )
}
