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
import { GamePage } from './view/pages/game/GamePage.tsx'
import { GameEndPage } from './view/pages/game/GameEndPage.tsx'
// session
import { PrivatePage } from './view/pages/PrivatePage'
import { LoginPage } from './view/pages/LoginPage'

export default function App () {
  console.log('App')
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<HomePage />}
          >
            <Route
              index
              element={<GameWelcomePage />}
            />
            <Route
              path="/game"
              element={<GameWelcomePage />}
            />
            <Route
              path="/game/:id/play"
              element={<GamePage />}
            />
            <Route
              path="/game/:id/end"
              element={<GameEndPage />}
            />
          </Route>
          <Route
            path="/login"
            element={<LoginPage />}
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
