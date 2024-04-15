import 'reflect-metadata'

import { Route, Routes } from 'react-router-dom'

import { AppProvider } from './providers/AppProvider.tsx'

import { PublicLayout } from './layouts/PublicLayout.tsx'

import './App.css'
// components
import { CredentialChecker } from './components/auth/CredentialChecker.tsx'
// pages
import { HomePage } from './pages/HomePage.tsx'
// game
import { GameWelcomePage } from './pages/public/game/GameWelcomePage.tsx'
import { GamePlayPage } from './pages/public/game/GamePlayPage.tsx'
import { GameEndPage } from './pages/public/game/GameEndPage.tsx'
// session
import { DashboardLayout } from './layouts/DashboardLayout.tsx'
import { SignInPage } from './pages/public/auth/SignInPage.tsx'
import { WaitOneTimePassword } from './pages/public/auth/WaitOneTimePassword.tsx'

import { DashboardGamesPage } from './pages/dashboard/DashboardGamesPage.tsx'
import { DashboardSettingsPage } from './pages/dashboard/DashboardSettingsPage.tsx'
import { DashboardMyAccountPage } from './pages/dashboard/DahboardMyAccountPage.tsx'

export default function App () {
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
          <Route element={<CredentialChecker reverse />}>
            <Route
              path="/auth/sign-in"
              element={<SignInPage />}
            />
          </Route>
          <Route
            path="/auth/otp"
            element={<WaitOneTimePassword />}
          />
        </Route>

        <Route element={<CredentialChecker />}>
          <Route
            path="/dashboard"
            element={<DashboardLayout />}
          >
            <Route
              index
              element={<DashboardGamesPage />}
            />
            <Route
              path="/dashboard/games"
              element={<DashboardGamesPage />}
            />
            <Route
              path="/dashboard/my-account"
              element={<DashboardMyAccountPage />}
            />
            <Route
              path="/dashboard/settings"
              element={<DashboardSettingsPage />}
            />
          </Route>
        </Route>
      </Routes>
    </AppProvider>
  )
}
