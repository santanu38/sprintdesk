import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"

const LoginPage = lazy(() => import("../pages/LoginPage"))
const DashboardPage = lazy(() => import("../pages/DashboardPage"))
const BoardPage = lazy(() => import("../pages/BoardPage"))
const AnalyticsPage = lazy(() => import("../pages/AnalyticsPage"))

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="text-white">Loading page...</div>
          </div>
        }
      >
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter