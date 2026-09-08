import React, { useState } from "react"
import { useLogin } from "../hooks/useAuth"

function LoginPage() {

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const {mutate:login,isPending,isError,error}=useLogin()

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  login({username,password})
}

   return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-white mb-6">SprintDesk Login</h1>

        <div>
          <label htmlFor="username" className="block text-sm text-slate-300 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-slate-300 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {isError && (
          <p className="text-red-400 text-sm">
            {error instanceof Error ? error.message : "Login failed"}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 rounded transition"
        >
          {isPending ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  )
}

export default LoginPage