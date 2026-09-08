import axios from "axios";
import type { MockData } from "../types/mock-data.types";
import type { Comment, Sprint, Task } from "../types/task.types";
import type { User } from "../types/user.types";

// Internal — fetches and caches the entire mock dataset once.
// Simulates what would otherwise be several separate backend endpoints.
let cachedData:MockData | null=null;

async function loadMockData(): Promise<MockData>{
    if(cachedData) return cachedData;
    
    const response=await axios.get<MockData>("/mock-data.json")
    cachedData=response.data;
    return cachedData;
}

export async function fetchTasks():Promise<Task[]>{
    const data=await loadMockData();
    return data.tasks.slice(0,30)
}

export async function fetchUser():Promise<User[]>{
    const data =await loadMockData();
    return data.users;
}

export async function fetchSprints():Promise<Sprint[]>{
    const data=await loadMockData();
    return data.sprints;
}

export async function fetchComments(taskId:number):Promise<Comment[]>{
   const data=await loadMockData();
   return data.comments.filter((comment)=>comment.taskId===taskId)
}