
import axios from 'axios'
import { useAuthStore } from '../store/authStore'
import { refreshTokenRequest } from './auth.api'

// Base client for DummyJSON (auth + token refresh)
export const dummyJsonClient=axios.create({
    baseURL:"https://dummyjson.com"
})


// Base client for JSONPlaceholder (notification polling)
export const jsonPlaceholderClient=axios.create({
  baseURL:"https://jsonplaceholder.typicode.com",
})

//Autometically attach the barier token to every outgoing request
dummyJsonClient.interceptors.request.use((config)=>{
    const accessToken=useAuthStore.getState().accessToken
    if(accessToken){
       config.headers.Authorization=`Bearer ${accessToken}`
    }
    return config
})

//track whether a refhesh already in progress so multiple simultaneous
// 401s don't each trigger their own separate refresh call.

let isRefreshing=false
let refreshSubscribers:Array<(token:string)=>void>=[]


function onRefreshed(newAccessToken:string){
   refreshSubscribers.forEach((callback)=>callback(newAccessToken))
   refreshSubscribers=[]
}

dummyJsonClient.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const originalRequest=error.config

        //only attempt refresh on a 401 and only once per request (avoid infinite loop)
        if(error.response?.status===401 && ! originalRequest._retry){
            originalRequest._retry = true
            const storedRefreshToken=localStorage.getItem("refreshToken")
            if(!storedRefreshToken){
                useAuthStore.getState().clearAuth()
                return Promise.reject(error)
            }

            if(isRefreshing){
                //a refresh alreay happening- wait for it and retry with new token
               return new Promise((resolve)=>{
                  refreshSubscribers.push((newAccessToken)=>{
                     originalRequest.headers.Authorization=`Bearer ${newAccessToken}`
                     resolve(dummyJsonClient(originalRequest))
                  })
               })
            }

            isRefreshing=true
            try{
                const data=await refreshTokenRequest(storedRefreshToken)
                
                const currentUser=useAuthStore.getState().user
                const setAuth=useAuthStore.getState().setAuth
                setAuth(currentUser!,data.accessToken)

            
                localStorage.setItem("refreshToken",data.refreshToken)
                isRefreshing=false
                onRefreshed(data.accessToken)
                originalRequest.headers.Authorization=`Bearer ${data.accessToken}`
                return dummyJsonClient(originalRequest)
            }catch(refreshError){
                isRefreshing=false
                useAuthStore.getState().clearAuth()
                localStorage.removeItem("refreshToken")
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)