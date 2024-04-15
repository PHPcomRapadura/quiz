import { useContext } from 'react'
import { AppContext } from '../components/app/AppContext'
import { AppContextContract } from '../contracts.ts'

export function useApp (): AppContextContract {
    return useContext(AppContext)
}
