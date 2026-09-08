
import { useDroppable } from "@dnd-kit/core"
import type { Task, TaskStatus } from "../../types/task.types";
import TaskCard from "./TaskCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard";


interface BoardColumnProps{
    title:string,
    status:TaskStatus,
    tasks:Task[]
}

function BoardColumn({title,tasks}:BoardColumnProps){

  const {setNodeRef}=useDroppable({id: status})

    return (
    <div className="bg-slate-900 rounded-lg p-4 w-72 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">{title}</h2>
        <span className="text-slate-400 text-sm bg-slate-800 px-2 py-0.5 rounded">
          {tasks.length}
        </span>
      </div>
      {/* <div>
        {tasks.map((task) => (
            
          <TaskCard key={task.id} task={task} />
        ))}
      </div> */}
      <div ref={setNodeRef} className="min-h-[200px]">
          <SortableContext
          items={tasks.map((task)=>task.id)}
          strategy={verticalListSortingStrategy}
          >
           {tasks.map((task)=>(
              <SortableTaskCard key={task.id} task={task}/>
           ))}
          </SortableContext>
      </div>
    </div>
  )
}

export default BoardColumn