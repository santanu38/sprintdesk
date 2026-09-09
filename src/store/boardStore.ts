import { create } from "zustand";
import type { Task, TaskStatus } from "../types/task.types";
import { persist } from "zustand/middleware";

interface BoardState{
    tasks:Task[]
    selectedTaskId:number | null
    setTasks:(tasks:Task[])=>void
    moveTask:(taskId:number,newStatus:TaskStatus,newOrder:number)=>void
    addTask:(task:Task)=>void
    deleteTask:(taskId:number)=>void
    updateTask:(taskId:number,updates:Partial<Task>)=>void
    openTaskDrawer:(taskId:number)=>void
    closeTaskDrawer:()=>void

}

export const useBoardStore=create<BoardState>()(
    persist(
        (set)=>({
            tasks:[],
            setTasks:(tasks)=>set({tasks}),
            selectedTaskId:null,
            openTaskDrawer:(taskId)=>set({selectedTaskId:taskId}),
            closeTaskDrawer:()=>set({selectedTaskId:null}),

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
                })),
        
       }),
        {
            name: "sprintdesk-board-storage",

            // this tells persist to only save the tasks array,
            //  NOT selectedTaskId. -> selectedTaskId is temporary 
            //  UI state (which drawer is open right now) — 
            //  we don't want a refresh to reopen a drawer 
            //  that was open before. Only the actual task 
            //  data should survive a refresh.

            partialize: (state) => ({ tasks: state.tasks }),
       }
    )

)