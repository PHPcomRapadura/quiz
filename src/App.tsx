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
import { PrivatePage } from './view/pages/PrivatePage'
import { SignInPage } from './view/pages/SignInPage.tsx'

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
            path="/game"
            element={<GameWelcomePage />}
          />
          <Route
            path="/game/:id/play"
            element={<GamePlayPage />}
          />
          <Route
            path="/game/:id/end"
            element={<GameEndPage />}
          />
          <Route
            path="/sign-in"
            element={<SignInPage />}
          />
          <Route
            element={<ProtectPage />}
          >
            <Route
              path="/private"
              element={<PrivatePage />}
            />
          </Route>
        </Route>
      </Routes>
    </AppProvider>
  )
}
