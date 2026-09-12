import { create } from "zustand"


export type ToastType="success" | "error" | "info"

interface Toast{
    id:number,
    message:string,
    type:ToastType
}

interface ToastState{
    toasts:Toast[]
    addToast:(message:string,type?:ToastType)=>void
    removeToast:(id:number)=>void
}

let nextId=1;
export const useToastStore=create<ToastState>((set)=>({
   toasts:[],

   addToast:(message,type="info")=>
     set((state)=>({
        toasts:[...state.toasts,{id:nextId++,message,type}]
     })),

     removeToast:(id)=>
        set((state)=>({
            toasts:state.toasts.filter((t)=>t.id !==id)
        }))
}))