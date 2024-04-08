import { useNavigate, useParams } from 'react-router-dom'

export function GameEndPage () {
  const params = useParams()
  const gameId = Number(params.id)
  const navigate = useNavigate()
  return (
    <div
      className="end"
    >
      <img
        style={{ width: '80%' }}
        className="center-block"
        src="/assets/images/phpinga.png"
        alt="PHPinga"
      />
      <h1 className="text-center">O jogo acabou!</h1>
      <p className="text-center">
        Não está bêbado suficiente? Clique em "Começar de novo"!
      </p>
      <button
        style={{ width: '100%', marginTop: '50px' }}
        className="center-block btn btn-lg btn-primary"
        onClick={() => navigate(`/game/${gameId}/play`)}
      >
        Começar de novo
      </button>
    </div>
  )
}
