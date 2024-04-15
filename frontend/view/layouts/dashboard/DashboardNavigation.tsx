import { NavLink, Outlet } from 'react-router-dom'

import { useI18n } from '../../hooks'

export function DashboardNavigation () {
  const $t = useI18n('layouts.dashboard')

  return (
    <div className="card bg-secondary py-1 px-2">
      <ul
        className="nav nav-tabs nav-fill"
        role="tablist"
      >
        <li
          className="nav-item"
          role="presentation"
        >
          <NavLink
            className="nav-link"
            role="tab"
            to="/dashboard"
            end
          >
            {$t('navigation.index')}
          </NavLink>
        </li>
        <li
          className="nav-item"
          role="presentation"
        >
          <NavLink
            className="nav-link"
            role="tab"
            to="/dashboard/my-account"
          >
            {$t('navigation.account')}
          </NavLink>
        </li>
        <li
          className="nav-item"
          role="presentation"
        >
          <NavLink
            className="nav-link"
            to="/dashboard/settings"
            role="tab"
          >
            {$t('navigation.settings')}
          </NavLink>
        </li>
      </ul>
      <div className="py-2">
        <Outlet />
      </div>
    </div>
  )
}
