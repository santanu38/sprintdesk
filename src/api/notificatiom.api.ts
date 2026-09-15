import { jsonPlaceholderClient } from "./client"

interface Post{
    id:number
    title:string
    body:string
}

export async function pollNotificationSource():Promise<Post[]>{
   const response=await jsonPlaceholderClient.get<Post[]>("/posts",{
     params:{_limit:5}
   })
   return response.data
}



// for polling more notification after certain setIntervals

// export async function pollNotificationSource(): Promise<Post[]> {
//   const randomStart = Math.floor(Math.random() * 90) // JSONPlaceholder has 100 posts total
//   const response = await jsonPlaceholderClient.get<Post[]>("/posts", {
//     params: { _limit: 5, _start: randomStart },
//   })
//   return response.data
// }