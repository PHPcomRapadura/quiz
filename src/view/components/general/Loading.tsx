export function Loading ({ width = '75%', label = '' }) {
  return (
    <>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width }}
        />
      </div>
      {
        label && (
          <div className="text-center">
            <small>{label}</small>
          </div>
        )
      }
    </>
  )
}
