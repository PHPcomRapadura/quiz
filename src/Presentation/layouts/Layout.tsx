import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
        <div>
            <Link to="/">Pública</Link>
            &nbsp;|&nbsp;
            <Link to="/private">Privada</Link>
        </div>

        <Outlet />
    </div>
  )
}
