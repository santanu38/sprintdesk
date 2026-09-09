import { useBoardStore } from "../../store/boardStore";
import type { Task } from "../../types/task.types";


interface TaskCardProps{
    task:Task
}

const priorityColors: Record<Task["priority"], string> = {
  low: "bg-slate-600",
  medium: "bg-yellow-600",
  high: "bg-red-600",
}

function TaskCard({ task }: TaskCardProps) {
  const openTaskDrawer=useBoardStore((state)=>state.openTaskDrawer)
  return (
    <div 
    onClick={()=>openTaskDrawer(task.id)}
    className="bg-slate-800 p-3 rounded-lg mb-2 cursor-pointer hover:bg-slate-750 transition">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[task.priority]} text-white`}>
          {task.priority}
        </span>
      </div>
      <h3 className="text-sm text-white font-medium mb-2">{task.title}</h3>
      <p className="text-xs text-slate-400">Due {task.dueDate}</p>
    </div>
  )
}

export default TaskCard