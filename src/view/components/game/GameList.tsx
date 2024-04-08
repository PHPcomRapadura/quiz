import Game from '../../../app/Domain/Game/Game.ts'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import styles from './game-list/index.module.css'

export function GameList ({ games }: { games: Game[] }) {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'components.game.list' }
  )
  return (
    <>
      <h6>{t('title')}</h6>
      {
        games.length > 0 ?
          <div className={styles.GameList}>
            {games.map((game: Game) => (
              <div
                key={game.id}
                className="alert alert-primary"
              >
                <Link
                  className="text-light-emphasis"
                  to={`/game/${game.id}/play`}
                >
                  {game.description}
                </Link>
              </div>
            ))}
          </div> :
          <small className="fw-lighter">{t('empty')}</small>
      }
    </>
  )
}
