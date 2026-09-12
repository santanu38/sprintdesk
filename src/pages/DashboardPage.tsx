import Navbar from "../components/layout/Navbar"
import { useToast } from "../hooks/useToast"

function DashboardPage() {
  const toast=useToast()
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Dashboard Page</h1>
        <button onClick={()=>toast.success("Its works !")}>
          Test Toast
        </button>
      </div>
    </div>
  )
}

export default DashboardPage