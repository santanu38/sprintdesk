import type { LoginCredentials, AuthUser } from "../types/auth.types";
import { dummyJsonClient } from "./client";

interface LoginResponse extends AuthUser{
    accessToken:string
    refreshToken:string
}

interface RefreshResponse{
    accessToken:string
    refreshToken:string
}

export async function loginRequest(credentials:LoginCredentials):Promise<LoginResponse> {
    const response=await dummyJsonClient.post<LoginResponse>("/auth/login",{
        username:credentials.username,
        password:credentials.password,
        expiresInMins:60
    })
    return response.data
}

export async function refreshTokenRequest(refreshToken:string):Promise<RefreshResponse>{
    const response=await dummyJsonClient.post<RefreshResponse>("/auth/refresh",{
        refreshToken,

    })
    return response.data
}


