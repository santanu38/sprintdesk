import { Link, useLocation } from "react-router-dom"

import { useLogout } from "../../hooks/useLogout"
import NotificationBell from "../../features/notification/NotificationBell"


function Navbar() {
  const location = useLocation()
  const logout = useLogout()

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/board", label: "Board" },
    { to: "/analytics", label: "Analytics" },
  ]

  return (
    <nav className="bg-slate-800 px-6 py-4 flex justify-between items-center">
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm font-medium ${
              location.pathname === link.to
                ? "text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

        <div className="flex items-center gap-4">
          <NotificationBell/>
        
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar