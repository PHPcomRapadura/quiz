import { GameQuestionComponentsProps } from './GameQuestion.tsx'
import { image } from '../../../config/assets.ts'

export function GameCorrectAnswer ({ finishQuestion }: GameQuestionComponentsProps) {
  return (
    <div className="correct">
      <img
        style={{ width: '80%' }}
        className="center-block"
        src={image('/phpinga.png')}
        alt="PHPinga"
      />
      <h1 className="text-center">Certa a resposta!</h1>
      <p className="text-center">
        Você acertou! Escolha alguém para beber e passe a vez para a pessoa à sua esquerda.
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
