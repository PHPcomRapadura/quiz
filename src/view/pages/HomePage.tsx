import { Outlet } from 'react-router-dom'

export function HomePage () {
  return (
    <>
      <div className="container">
        <div
          className="app col-md-6 col-md-offset-3"
        >
          <Outlet />
        </div>
      </div>
    </>
  )
}
