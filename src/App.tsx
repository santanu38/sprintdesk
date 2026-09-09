import AppRouter from "./routes/AppRouter"
import { useInitAuth } from "./hooks/useInitAuth"

function App() {
    const { isInitializing } = useInitAuth()

     if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-lg">Loading your session...</div>
      </div>
    )
  }
  return <AppRouter />
}

export default App