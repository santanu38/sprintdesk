import { useEffect } from "react"
import { useBoardStore } from "../store/boardStore"
import { useTasks } from "./useTasks"


export function useBaord(){
   const {data:fetchedTask,isLoading,isError}=useTasks()
   const tasks=useBoardStore((state)=>state.tasks)
   const setTasks=useBoardStore((state)=>state.setTasks)

   useEffect(()=>{
     if(fetchedTask && tasks.length===0){
        setTasks(fetchedTask)
     }
   },[fetchedTask,setTasks])


    return {tasks,isLoading,isError}
}