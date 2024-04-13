import { useTranslation } from 'react-i18next'
import { useId, useState } from 'react'
import { DriverType } from '../../../src/Domain/Contracts.ts'
import { Case, Switch } from '../../components/general/Conditional.tsx'
import { useApp } from '../../hooks/useApp.ts'

export function DashboardSettingsPage () {
  const { t } = useTranslation(
    'default',
    { keyPrefix: 'pages.dashboard' }
  )
  const driverTypeId = useId()
  const { session } = useApp()

  const [driverType, setDriverType] = useState(session.driver.type)

  return (
    <form className="form-container">
      <div className="form-row">
        <label
          htmlFor={driverTypeId}
          className="form-label"
        >
          {t('driverType')}
        </label>
        <select
          className="form-select"
          id={driverTypeId}
          name="driverType"
          value={driverType}
          onChange={(event) => setDriverType(event.target.value as DriverType)}
        >
          <option value={DriverType.http}>HTTP</option>
          <option value={DriverType.memory}>Memory</option>
          <option value={DriverType.supabase}>Supabase</option>
        </select>
      </div>
      <div>
        <Switch condition={driverType}>
          <Case value={DriverType.http}>
            HTTP
          </Case>
          <Case value={DriverType.memory}>
            Memory
          </Case>
          <Case value={DriverType.supabase}>
            Supabase
          </Case>
        </Switch>
      </div>
    </form>
  )
}
