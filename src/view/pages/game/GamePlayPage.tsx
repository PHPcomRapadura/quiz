import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import GameRepository from '../../../app/Domain/Game/GameRepository.ts'
import Game from '../../../app/Domain/Game/Game.ts'

import { useApp } from '../../hooks'
import { Hydrated, HydratedStatus, On } from '../../components/general/Hydrated.tsx'
import { Loading } from '../../components/general/Loading.tsx'
import { Warning } from '../../components/general/Alert.tsx'
import { GamePlaySession } from '../../components/game/GamePlaySession.tsx'

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
    return navigate(`/game/${gameId}/not-found`)
  }

  return (
    <Hydrated
      hidrate={() => gameRepository.findById(gameId)}
      onResolve={onResolve}
      onReject={onReject}
    >
      <On status={HydratedStatus.Pending}>
        <div className="py-3">
          <Loading label={t('pending')} />
        </div>
      </On>
      <On status={HydratedStatus.Resolved}>
        <GamePlaySession
          game={game}
          onFinish={() => navigate(`/game/${gameId}/end`)}
        />
      </On>
      <On status={HydratedStatus.Rejected}>
        <div className="py-2">
          <Warning
            strong={t('error')}
            message={t('rejected')}
          />
        </div>
      </On>
    </Hydrated>
  )
}
