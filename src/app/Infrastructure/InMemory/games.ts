import Game from '../../Domain/Game/Game.ts'

import games from './games.json'

export default function (): Game[] {
  return games as unknown as Game[]
}
