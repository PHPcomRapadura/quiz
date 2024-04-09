import 'reflect-metadata'

import { Route, Routes } from 'react-router-dom'

import { AppProvider } from './view/providers/AppProvider'

import { PublicLayout } from './view/layouts/PublicLayout.tsx'

import './App.css'
// components
import { ProtectPage } from './view/components/auth/ProtectPage'
// pages
import { HomePage } from './view/pages/HomePage.tsx'
// game
import { GameWelcomePage } from './view/pages/game/GameWelcomePage.tsx'
import { GamePlayPage } from './view/pages/game/GamePlayPage.tsx'
import { GameEndPage } from './view/pages/game/GameEndPage.tsx'
// session
import { DashboardPage } from './view/pages/DashboardPage.tsx'
import { SignInPage } from './view/pages/auth/SignInPage.tsx'
import { WaitOneTimePassword } from './view/pages/auth/WaitOneTimePassword.tsx'
import { useRunOnce } from './view/hooks/useRunOnce.ts'

import { name } from './config/i18n.ts'

export default function App () {
  useRunOnce(() => document.title = name)

  return (
    <AppProvider>
      <Routes>
        <Route
          path="/"
          element={<PublicLayout />}
        >
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="/games"
            element={<GameWelcomePage />}
          />
          <Route
            path="/games/:id/play"
            element={<GamePlayPage />}
          />
          <Route
            path="/games/:id/end"
            element={<GameEndPage />}
          />
          <Route
            path="/auth/sign-in"
            element={<SignInPage />}
          />
          <Route
            path="/auth/otp"
            element={<WaitOneTimePassword />}
          />
        </Route>
        <Route
          element={<ProtectPage />}
        >
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />
        </Route>
      </Routes>
    </AppProvider>
  )
}
