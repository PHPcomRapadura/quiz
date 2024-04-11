import 'reflect-metadata'

import { Route, Routes } from 'react-router-dom'

import { AppProvider } from './providers/AppProvider.tsx'

import { PublicLayout } from './layouts/PublicLayout.tsx'

import './App.css'
// components
import { ProtectPage } from './components/auth/ProtectPage.tsx'
// pages
import { HomePage } from './pages/HomePage.tsx'
// game
import { GameWelcomePage } from './pages/game/GameWelcomePage.tsx'
import { GamePlayPage } from './pages/game/GamePlayPage.tsx'
import { GameEndPage } from './pages/game/GameEndPage.tsx'
// session
import { DashboardPage } from './pages/DashboardPage.tsx'
import { SignInPage } from './pages/auth/SignInPage.tsx'
import { WaitOneTimePassword } from './pages/auth/WaitOneTimePassword.tsx'
import { useRunOnce } from './hooks/useRunOnce.ts'

import { name } from '../config/i18n.ts'

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
