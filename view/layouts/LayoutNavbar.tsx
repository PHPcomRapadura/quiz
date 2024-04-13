import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export type LayoutNavbarProps = {
  children: ReactElement[]
  condition: unknown
}

export function LayoutNavbar (props: LayoutNavbarProps) {
  const { children, condition } = props

  const { t } = useTranslation(
    'default',
    { keyPrefix: 'layouts.public' }
  )

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
        >
          {t('brand')}
        </Link>

        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link
              to="/games"
              className="nav-link"
            >
              {t('play')}
            </Link>
          </li>
        </ul>
        {children.find((child: ReactElement) => child.props.value === condition)}
      </div>
    </nav>
  )
}
