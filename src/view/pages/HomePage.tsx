import { Outlet } from 'react-router-dom'

export function HomePage () {
  return (
    <>
      <div className="container">
        <div className="app">
          <Outlet />
        </div>
      </div>
    </>
  )
}
