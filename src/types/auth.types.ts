

export interface AuthUser{
    id:number;
    username:string
    email:string
    firstName:string
    lastName:string
    image:string
}

export interface LoginCredentials{
    username:string
    password:string
}

export interface AuthTokens{
    accessToken:string
    refreshToken:string
}
