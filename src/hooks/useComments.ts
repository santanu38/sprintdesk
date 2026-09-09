import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/tasks.api";


export function useComments(taskId:number |null){
    return useQuery({
        queryKey:["comments",taskId],
        queryFn:()=>fetchComments(taskId !),
        enabled:taskId !==null
    })
}