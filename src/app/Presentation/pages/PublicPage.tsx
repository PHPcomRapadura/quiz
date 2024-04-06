import { useApp } from '../hooks'

export function PublicPage () {
  const app = useApp()
  const signOut = () => {
    app.auth.signOut()
  }
  return (
    <>
      <p>
        Eu sou uma página pública
      </p>
      <pre>{app.session?.username}</pre>
      <button onClick={signOut}>Sair Fora do Rolê</button>
    </>
  )
}
