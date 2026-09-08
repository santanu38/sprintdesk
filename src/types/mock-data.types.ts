import type { AppNotification} from "./notification.types";
import type { Comment, Sprint, Task } from "./task.types";
import type { User } from "./user.types";


export interface MockData{
    users:User[]
    sprints:Sprint[]
    tasks:Task[]
    comments:Comment[]
    notifications:AppNotification[]
}