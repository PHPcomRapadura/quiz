import 'reflect-metadata'

import { Route, Routes } from 'react-router-dom'

import { AppProvider } from './view/providers/AppProvider'

import { Layout } from './view/layouts/Layout'

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

export default function App () {
  return (
    <AppProvider>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
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
          <Route
            element={<ProtectPage />}
          >
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />
          </Route>
        </Route>
      </Routes>
    </AppProvider>
  )
}
