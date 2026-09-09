import { useEffect, useRef } from "react"
import { useAuthStore } from "../store/authStore"
import { refreshTokenRequest, getMeRequest } from "../api/auth.api"

export function useInitAuth() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const finishInitializing = useAuthStore((state) => state.finishInitializing)
  const isInitializing = useAuthStore((state) => state.isInitializing)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    async function restoreSession() {
      const storedRefreshToken = localStorage.getItem("refreshToken")

      if (!storedRefreshToken) {
        finishInitializing()
        return
      }

      try {
        const tokenData = await refreshTokenRequest(storedRefreshToken)
        localStorage.setItem("refreshToken", tokenData.refreshToken)

        useAuthStore.setState({ accessToken: tokenData.accessToken })

        const user = await getMeRequest()
        setAuth(user, tokenData.accessToken)
      } catch {
        localStorage.removeItem("refreshToken")
        useAuthStore.getState().clearAuth()
      } finally {
        finishInitializing()
      }
    }

    restoreSession()
  }, [finishInitializing, setAuth])

  return { isInitializing }
}