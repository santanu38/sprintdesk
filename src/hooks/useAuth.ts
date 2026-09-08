import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { loginRequest } from "../api/auth.api"
import type { LoginCredentials } from "../types/auth.types"

export function useLogin(){
    const setAuth=useAuthStore((state)=>state.setAuth)
    const navigate=useNavigate()

    return useMutation({
        mutationFn:(credentials:LoginCredentials)=>loginRequest(credentials),
        onSuccess:(data)=>{
            const {accessToken,refreshToken,...user}=data
            setAuth(user,accessToken)
            localStorage.setItem("refreshToken",refreshToken)
            navigate("/dashboard")
        }
    })
}