import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import GameRepository from '../../../../src/Domain/Game/GameRepository.ts'
import Game from '../../../../src/Domain/Game/Game.ts'

import { GamePlaySession } from '../../../components/game/GamePlaySession.tsx'
import { AlertWarning, Async, AsyncStatus, Loading, On } from '../../../components/general'
import { useApp, useI18n } from '../../../hooks'

export function GamePlayPage () {
  const params = useParams()
  const gameId = Number(params.id)
  const { container } = useApp()
  const navigate = useNavigate()
  const $t = useI18n('pages.game.play')

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

  const onReject = (error: unknown) => {
    console.error(error)
    return navigate(`/games/${gameId}/not-found`)
  }

  return (
    <Async<Game>
      using={() => gameRepository.findById(gameId)}
      onResolve={onResolve}
      onReject={onReject}
    >
      <On status={AsyncStatus.Pending}>
        <div className="py-3">
          <Loading label={$t('pending')} />
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
            strong={$t('error')}
            message={$t('rejected')}
          />
        </div>
      </On>
    </Async>
  )
}
