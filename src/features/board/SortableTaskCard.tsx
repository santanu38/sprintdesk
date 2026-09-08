import { useSortable } from "@dnd-kit/sortable";
import type { Task } from "../../types/task.types";
import TaskCard from "./TaskCard";
import { CSS } from "@dnd-kit/utilities"


interface SortableTaskCardProp{
  task:Task
}

function SortableTaskCard({task}:SortableTaskCardProp){
    const {attributes, listeners, setNodeRef, transform, transition, isDragging}=
     useSortable({id:task.id})
   const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  return(
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TaskCard task={task}/>
    </div>
  )

}
export default SortableTaskCard