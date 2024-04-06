import DependencyContainer from 'tsyringe/dist/typings/types/dependency-container'

export type User = { username: string, abilities: string[] } | null

export interface AppContextType {
    container: DependencyContainer
    user: User
    signIn: (username: string, password: string) => Promise<User>
    signOut: () => Promise<boolean>
}
