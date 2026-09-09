import type { AuthUser } from "../types/auth.types";
import { create } from "zustand";


interface AuthState{
    user:AuthUser | null
    accessToken:string | null
    isAuthenticated:boolean
    isInitializing: boolean
    setAuth:(user:AuthUser , accessToken:string ) => void
    clearAuth:() => void
    finishInitializing: () => void
}

export const useAuthStore=create<AuthState>((set)=>({
   user:null,
   accessToken:null,
   isAuthenticated:false,
    isInitializing: true,

   setAuth:(user,accessToken)=>
    set({
        user,
        accessToken,
        isAuthenticated:true
    }),

    clearAuth:()=>
        set({
            user:null,
            accessToken:null,
            isAuthenticated:false
        }),
        finishInitializing: () => set({ isInitializing: false }),
}))
