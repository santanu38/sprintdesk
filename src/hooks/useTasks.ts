import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks.api";


export function useTasks(){
    return useQuery({
        queryKey:["tasks"],
        queryFn:fetchTasks
    })
}