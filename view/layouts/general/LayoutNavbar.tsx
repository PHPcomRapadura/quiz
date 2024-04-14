import { Link, useNavigate } from 'react-router-dom'
import { Case, Switch } from '../../components/general/Conditional.tsx'
import { AuthContract, Session } from '../../../src/Domain/Auth/Auth.ts'
import { useI18n } from '../../hooks/useI18n.ts'

export type LayoutNavbarProps = {
  session: Session
  auth: AuthContract
  layout: 'public' | 'dashboard'
}

export function LayoutNavbar (props: LayoutNavbarProps) {
  const { layout, session, auth } = props
  const navigate = useNavigate()
  const $t = useI18n(`layouts.${layout}`)

  const signOut = async () => {
    const done = await auth.signOut()
    if (done) {
      navigate('/')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
        >
          {$t('brand')}
        </Link>

        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link
              to="/games"
              className="nav-link"
            >
              {$t('play')}
            </Link>
          </li>
        </ul>

        <Switch condition={layout}>
          <Case value="public">
            <Switch condition={!!session.credential}>
              <Case value={true}>
                <small className="text-light-emphasis px-2">{session.username}</small>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  {$t('myAccount')}
                </button>
              </Case>
              <Case value={false}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/auth/sign-in')}
                >
                  {$t('signIn')}
                </button>
              </Case>
            </Switch>
          </Case>
          <Case value="dashboard">
            <Switch condition={!!session.credential}>
              <Case value={true}>
                <small className="text-light-emphasis px-2">{session.username}</small>
                <button
                  className="btn btn-outline-primary"
                  onClick={signOut}
                >
                  {$t('signOut')}
                </button>
              </Case>
              <Case value={false}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/games')}
                >
                  {$t('games')}
                </button>
              </Case>
            </Switch>
          </Case>
        </Switch>
      </div>
    </nav>
  )
}
