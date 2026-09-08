import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"
export function useLogout(){
    const clearAuth=useAuthStore((state)=>state.clearAuth)
    const navigate=useNavigate()

    return function logout(){
        clearAuth()
        localStorage.removeItem("refreshToken")
        navigate("/login")
    }
}