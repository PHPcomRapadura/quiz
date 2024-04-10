import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { image } from '../../config/assets.ts'

export function HomePage () {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.home' }
  )

  return (
    <div className="card bg-secondary py-3 px-4 rounded">
      <h1>{t('title')}</h1>
      <p className="lead mb-3">{t('description')}</p>
      <p className="lead mb-1">
        {t('contributing')}
      </p>
      <p className="lead mb-3">
        <a
          className="text-light-emphasis"
          href="https://github.com/PHPcomRapadura/quiz"
          target="_blank"
        >
          <img
            src={image('github/mark.png')}
            className="img-fluid"
            alt="github logo"
            width="60"
          />
        </a>
      </p>
      <Link
        className="btn btn-lg btn-primary"
        to="/games"
        role="button"
      >
        {t('callToAction')}
      </Link>
    </div>
  )
}
