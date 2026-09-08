import { create } from "zustand";
import type { Task, TaskStatus } from "../types/task.types";

interface BoardState{
    tasks:Task[]
    setTasks:(tasks:Task[])=>void
    moveTask:(taskId:number,newStatus:TaskStatus,newOrder:number)=>void
    addTask:(task:Task)=>void
    deleteTask:(taskId:number)=>void
    updateTask:(taskId:number,updates:Partial<Task>)=>void

}

export const useBoardStore=create<BoardState>((set)=>({
   tasks:[],
   setTasks:(tasks)=>set({tasks}),

   moveTask:(taskId,newStatus,newOrder)=>
    set((state)=>({
       tasks:state.tasks.map((task)=>task.id===taskId?{...task,status:newStatus,order:newOrder}:task)
    })),

      addTask:(task)=>
        set((state)=>({
           tasks:[...state.tasks,task]
        })),

    deleteTask:(taskId)=>
        set((state)=>({
            tasks:state.tasks.filter((task)=>task.id !==taskId)
        })),
    
     updateTask:(taskId,updates)=>
        set((state)=>({
            tasks:state.tasks.map((task)=>
             task.id===taskId?{...task,...updates}:task
            )
        }))
}))