import Game from '../../Domain/Game/Game.ts'

import games from '../../../../public/static/games.json'

export default function (): Game[] {
  return games as unknown as Game[]
}
