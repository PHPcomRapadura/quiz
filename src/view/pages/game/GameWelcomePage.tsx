import { useNavigate } from 'react-router-dom'

export function GameWelcomePage () {
  const navigate = useNavigate()
  return (
    <div
      className="welcome"
    >
      <img
        style={{ width: '80%' }}
        className="center-block"
        src="/assets/images/phpinga.png"
        alt="PHPinga"
      />
      <h1 className="text-center">PHPinga</h1>
      <p className="text-center">
        Cada um na mesa deve responder a uma pergunta sobre PHP.
        Caso acerte, pode escolher uma pessoa pra beber, caso erre tem de beber.
        Ao terminar, passa-se para o jogador da esquerda.
      </p>
      <button
        onClick={() => navigate('/game/1/play')}
        style={{ width: '100%', marginTop: '50px' }}
        className="center-block btn btn-lg btn-primary"
      >
        Ir para o Jogo
      </button>
    </div>
  )
}
