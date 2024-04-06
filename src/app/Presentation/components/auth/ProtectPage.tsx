import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useApp } from "../../hooks"

export function ProtectPage ({ children }: { children?: JSX.Element }) {
    const app = useApp()
    const from = useLocation()
    if (app.user) {
        return children ? children : <Outlet />
    }
    return <Navigate
        to="/login"
        state={{ from }}
        replace
    />
}
