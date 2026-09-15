import { create } from "zustand"
import { persist } from "zustand/middleware"


interface AppNotification{
    id:number
    title:string
    message:string
    read:boolean
    createdAt:string
}

interface NotificationState{
    notifications:AppNotification[],
    seenPostIds:number[],
    addNotifications:(newOnes:AppNotification[])=>void
    markSeenIds:(ids:number[])=>void
    markAsRead:(id:number)=>void
    markAllRead:()=>void
}

export const useNotificationStore=create<NotificationState>()(
    persist(
        (set)=>({
            notifications:[],
            seenPostIds:[],

            addNotifications:(newOnes)=>
                set((state)=>({
                    notifications:[...newOnes,...state.notifications].slice(0,20)
                })),
            
            markSeenIds:(ids)=>
                set((state)=>({
                    seenPostIds:[...state.seenPostIds,...ids]
                })),
            markAsRead:(id)=>
                set((state)=>({
                 notifications:state.notifications.map((n)=>
                  n.id===id?{...n,read:true}:n
                )
               })),

               markAllRead:()=>
                set((state)=>({
                    notifications:state.notifications.map((n)=>({...n,read:true}))
                })),

        }),
        {
      name: "sprintdesk-notification-storage",
    }
    )
)