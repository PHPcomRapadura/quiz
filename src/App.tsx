import 'reflect-metadata'

import { Route, Routes } from 'react-router-dom'

import { AppProvider } from './app/Presentation/providers/AppProvider'

import { Layout } from './app/Presentation/layouts/Layout'

import { PublicPage } from './app/Presentation/pages/PublicPage'
import { PrivatePage } from './app/Presentation/pages/PrivatePage'
import { ProtectPage } from './app/Presentation/components/auth/ProtectPage'
import { LoginPage } from './app/Presentation/pages/LoginPage'

import './App.css'

export default function App () {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout/>}>
          <Route
            path="/"
            element={<PublicPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            element={<ProtectPage/>}
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
