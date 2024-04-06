import 'reflect-metadata'

import { Route, Routes } from 'react-router-dom'

import { AppProvider } from './Presentation/providers/AppProvider'

import { Layout } from './Presentation/layouts/Layout'

import { PublicPage } from './Presentation/pages/PublicPage'
import { PrivatePage } from './Presentation/pages/PrivatePage'
import { ProtectPage } from './Presentation/components/auth/ProtectPage'
import { LoginPage } from './Presentation/pages/LoginPage'

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
