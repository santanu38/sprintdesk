import { useEffect, useRef } from "react";
import { useNotificationStore } from "../store/notificationStore";
import { useToast } from "./useToast";
import { useQuery } from "@tanstack/react-query";
import { pollNotificationSource } from "../api/notificatiom.api";


export function useNotificationPolling(isPanelOpen:boolean){
      const seenPostIds=useNotificationStore((state)=>state.seenPostIds)
      const addNotifications=useNotificationStore((state)=>state.addNotifications)
      const markSeenIds=useNotificationStore((state)=>state.markSeenIds)
      const toast=useToast()
     
      const isPanelOpenRef=useRef(isPanelOpen)


      useEffect(()=>{
        isPanelOpenRef.current=isPanelOpen
      },[isPanelOpen])

      const {data:posts}=useQuery({
         queryKey:["botification-poll"],
         queryFn:pollNotificationSource,
         refetchInterval:15000,
         refetchIntervalInBackground:false
      })

      useEffect(()=>{
        if(!posts) return

        const newPosts=posts.filter((post)=>!seenPostIds.includes(post.id))
        if(newPosts.length===0) return

         const newNotifications=newPosts.map((post)=>({
            id:post.id,
            title:"New Update",
            message:post.title,
            read:false,
            createdAt:new Date().toISOString()
         }))

         addNotifications(newNotifications)
         markSeenIds(newPosts.map((post)=>post.id))

         if(!isPanelOpenRef.current){
            toast.info(`${newNotifications.length} new notification(s)`)
         }
         
      },[posts])
}