import Navbar from "../components/layout/Navbar"

function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Dashboard Page</h1>
      </div>
    </div>
  )
}

export default DashboardPage