import { useState } from 'react'

import GameRepository from '../../../../src/Domain/Game/GameRepository.ts'
import Game from '../../../../src/Domain/Game/Game.ts'

import { useApp, useI18n } from '../../../hooks'

import { AlertWarning } from '../../../components/general/Alert.tsx'
import { Async, AsyncStatus, On } from '../../../components/general/Async.tsx'
import { Loading } from '../../../components/general/Loading.tsx'
import { GameList } from '../../../components/game/GameList.tsx'

export function GameWelcomePage () {
  const $t = useI18n('pages.game.welcome')
  const { container } = useApp()
  const gameRepository = container.resolve<GameRepository>('GameRepository')
  const [games, setGames] = useState<Game[]>([])

  return (
    <div className="py-3 px-4 rounded">
      <h1 className="text-center">{$t('title')}</h1>
      <p className="text-center">{$t('description')}</p>
      <Async<Game[]>
        using={() => gameRepository.paginate(1, 10)}
        onResolve={setGames}
      >
        <On status={AsyncStatus.Pending}>
          <div className="py-3">
            <Loading label={$t('pending')} />
          </div>
        </On>
        <On status={AsyncStatus.Resolved}>
          <GameList games={games} />
        </On>
        <On status={AsyncStatus.Rejected}>
          <div className="py-2">
            <AlertWarning
              strong={$t('error')}
              message={$t('rejected')}
            />
          </div>
        </On>
      </Async>
    </div>
  )
}
