import { image } from '../../../config/assets.ts'

export function Drink () {
  return (
    <div className="d-flex justify-content-center justify-content-center">
      <img
        className="img-fluid"
        src={image('/status/wrong.png')}
        alt="PHPinga"
        style={{ maxHeight: '40vh' }}
      />
    </div>
  )
}

export function Celebrate () {
  return (
    <div className="d-flex justify-content-center justify-content-center">
      <img
        className="img-fluid"
        src={image('/status/correct.png')}
        alt="PHPinga"
        style={{ maxHeight: '40vh' }}
      />
    </div>
  )
}

export function Done () {
  return (
    <div className="d-flex justify-content-center justify-content-center">
      <img
        className="img-fluid"
        src={image('/status/done.png')}
        alt="PHPinga"
        style={{ maxHeight: '40vh' }}
      />
    </div>
  )
}
