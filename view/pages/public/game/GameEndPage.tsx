import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Done } from '../../../components/game/GameImage.tsx'
import { useI18n } from '../../../hooks/useI18n.ts'

export function GameEndPage () {
  const params = useParams()
  const gameId = Number(params.id)
  const navigate = useNavigate()
  const $t = useI18n('pages.game.end')
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
        <h1 className="text-center">{$t('title')}</h1>
        <p className="text-center">{$t('description')}</p>
      </div>
      <div className="d-grid">
        <button
          className="btn btn-lg btn-primary"
          onClick={() => navigate(`/games/${gameId}/play`)}
          disabled={timer > 0}
        >
          {timer > 0 ? $t('waiting', { timer }) : $t('restart')}
        </button>
      </div>
    </div>
  )
}
