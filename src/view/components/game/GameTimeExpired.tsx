import { GameQuestionComponentsProps } from './GameQuestion.tsx'

export function GameTimeExpired ({ finishQuestion }: GameQuestionComponentsProps) {
  return (
    <div className="wrong">
      <img
        style={{ width: '80%' }}
        className="center-block"
        src="/assets/images/phpinga.png"
        alt="PHPinga"
      />
      <h1 className="text-center">Acabou o tempo!</h1>
      <p className="text-center">
        Você demorou demais para responder! Agora tem de beber e passar a vez para a pessoa à sua esquerda.
      </p>
      <button
        style={{ width: '100%', marginTop: '50px' }}
        className="center-block btn btn-lg btn-primary"
        onClick={finishQuestion}
      >
        Próximo
      </button>
    </div>
  )
}
