import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import GameRepository from '../../../app/Domain/Game/GameRepository.ts'
import Game from '../../../app/Domain/Game/Game.ts'

import { useApp } from '../../hooks'
import { Hydrated, Pending, Rejected, Resolved } from '../../components/general/Hydrated.tsx'
import { GameList } from '../../components/game/GameList.tsx'

export function GameWelcomePage () {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.game.welcome' }
  )
  const { container } = useApp()
  const gameRepository = container.resolve<GameRepository>('GameRepository')
  const [games, setGames] = useState<Game[]>([])

  return (
    <div className="py-3 px-4 rounded">
      <h1 className="text-center">{t('title')}</h1>
      <p className="text-center">{t('description')}</p>
      <Hydrated
        hidrate={() => gameRepository.paginate(1, 10)}
        onResolve={setGames}
      >
        <Pending>
          <div className="py-3">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: '75%' }}
              />
            </div>
            <div className="text-center">
              <small>{t('pending')}</small>
            </div>
          </div>
        </Pending>
        <Resolved>
          <GameList games={games} />
        </Resolved>
        <Rejected>
          <div className="py-2">
            <div className="alert alert-dismissible alert-warning">
              <strong>{t('error')}</strong> {t('rejected')}
            </div>
          </div>
        </Rejected>
      </Hydrated>
    </div>
  )
}
