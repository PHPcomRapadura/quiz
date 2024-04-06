import 'reflect-metadata'
import { container } from 'tsyringe'
import React, { useState } from 'react'

import { AppContext } from '../components/app/AppContext'
import { AppContextContract, Session } from '../types'
import { AuthService } from '../../Application/AuthService.ts'
import { authManagerFactory } from './AuthManagerFactory.ts'

import SupabaseAuthRepository from '../../Infrastructure/Supabase/SupabaseAuthRepository.ts'

export function AppProvider ({ children }: { children: React.ReactNode }) {
  container.register('AuthService', { useClass: AuthService })
  container.register('AuthRepository', { useClass: SupabaseAuthRepository })

  const [session, setSession] = useState<Session>(null)

  const auth = authManagerFactory(setSession)

  const value: AppContextContract = { container, session, auth }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
