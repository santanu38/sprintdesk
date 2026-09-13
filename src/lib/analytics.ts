import type { Task, TaskStatus } from "../types/task.types";

export interface StatusCount{
    status:TaskStatus
    count:number
}

export interface PriorityCount{
    priority:string
    count:number
}

export interface CompletionPoint{
  date:string
  completed:number
}

export function getTaskStatusDistribution(tasks:Task[]):StatusCount[]{
     const statuses:TaskStatus[]=["backlog","in-progress","review","done"]
     
     return statuses.map((status)=>({
         status,
         count:tasks.filter((task)=>task.status===status).length
     }))
}

export function getPriorityBreakdown(tasks:Task[]):PriorityCount[]{
    const priorities=["low", "medium", "high"] as const

    return priorities.map((priority)=>({
        priority,
        count:tasks.filter((task)=>task.priority===priority).length
    }))
}

export function getCompletionTrend(tasks:Task[]):CompletionPoint[]{
    const completedTasks=tasks.filter((task)=>task.completedAt !==null)

    const countByDate=new Map<string,number>()

    completedTasks.forEach((task)=>{
        const date=task.completedAt!.split("T")[0]!

        countByDate.set(date,(countByDate.get(date)?? 0)+1)

    })

    return Array.from(countByDate.entries())
     .map(([date,completed])=>({date,completed}))
     .sort((a,b)=>a.date.localeCompare(b.date))
}

export function getSPrintVelocity(tasks:Task[]):{sprintId:number;completed:number}[]{
    const sprintIds=[1,2,3]

    return sprintIds.map((sprintId)=>({
        sprintId,
        completed:tasks.filter((task)=>task.sprintId===sprintId && task.status==="done").length
    }))
}