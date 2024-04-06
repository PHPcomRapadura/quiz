import { useApp } from '../hooks'

export function PublicPage () {
  const app = useApp()
  const signOut = () => {
    app.signOut()
  }
  return (
    <>
      <p>
        Eu sou uma página pública
      </p>
      <pre>{app.user?.username}</pre>
      <button onClick={signOut}>Sair Fora do Rolê</button>
    </>
  )
}
