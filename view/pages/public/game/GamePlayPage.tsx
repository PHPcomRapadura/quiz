import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import GameRepository from '../../../../src/Domain/Game/GameRepository.ts'
import Game from '../../../../src/Domain/Game/Game.ts'

import { useApp } from '../../../hooks/useApp.ts'
import { Async, AsyncStatus, On } from '../../../components/general/Async.tsx'
import { Loading } from '../../../components/general/Loading.tsx'
import { AlertWarning } from '../../../components/general/Alert.tsx'
import { GamePlaySession } from '../../../components/game/GamePlaySession.tsx'

export function GamePlayPage () {
  const params = useParams()
  const gameId = Number(params.id)
  const { container } = useApp()
  const navigate = useNavigate()
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.game.play' }
  )

  const stub = {
    description: '',
    author: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: []
  }
  const [game, setGame] = useState<Game>(stub)
  const gameRepository = container.resolve<GameRepository>('GameRepository')


  const onResolve = (game: Game) => {
    setGame(game)
  }

  const onReject = (error: Error) => {
    console.error(error)
    return navigate(`/games/${gameId}/not-found`)
  }

  return (
    <Async
      using={() => gameRepository.findById(gameId)}
      onResolve={onResolve}
      onReject={onReject}
    >
      <On status={AsyncStatus.Pending}>
        <div className="py-3">
          <Loading label={t('pending')} />
        </div>
      </On>
      <On status={AsyncStatus.Resolved}>
        <GamePlaySession
          game={game}
          onFinish={() => navigate(`/games/${gameId}/end`)}
        />
      </On>
      <On status={AsyncStatus.Rejected}>
        <div className="py-2">
          <AlertWarning
            strong={t('error')}
            message={t('rejected')}
          />
        </div>
      </On>
    </Async>
  )
}
