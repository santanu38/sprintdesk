import { DndContext ,closestCorners,useSensor,useSensors,PointerSensor} from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import Navbar from "../components/layout/Navbar"
import BoardColumn from "../features/board/BoardColumn"
import { useBaord } from "../hooks/useBoard"
import { useBoardStore } from "../store/boardStore"
import type { TaskStatus } from "../types/task.types"
import TaskDrawer from "../features/board/TaskDrawer"


const columns:{status:TaskStatus,title:string}[]=[
    { status: "backlog", title: "Backlog" },
    { status: "in-progress", title: "In Progress" },
    { status: "review", title: "Review" },
    { status: "done", title: "Done" },
  ]

function BoardPage() {

   const {tasks,isLoading,isError}=useBaord()
   const moveTask=useBoardStore((state)=>state.moveTask)


    function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const activeTaskId = Number(active.id)
    const activeTask = tasks.find((task) => task.id === activeTaskId)
    if (!activeTask) return

    // Determine the target status: `over.id` is either a column status
    // (dropped on empty space) or another task's id (dropped on a task).
    const overIsColumn = columns.some((col) => col.status === over.id)
    const targetStatus: TaskStatus = overIsColumn
      ? (over.id as TaskStatus)
      : tasks.find((task) => task.id === Number(over.id))?.status ?? activeTask.status

    const tasksInTargetColumn = tasks.filter((task) => task.status === targetStatus)
    const newOrder = tasksInTargetColumn.length + 1

    moveTask(activeTaskId, targetStatus, newOrder)
  }
    
  const sensors=useSensors(
    useSensor(PointerSensor,{
      activationConstraint:{
        distance:8
      }
    })
  )
   
   if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="text-white p-8">Loading board...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="text-red-400 p-8">Failed to load board</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="p-8 flex gap-4 overflow-x-auto">
        {columns.map((column) => (
          
          <BoardColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks
              .filter((task) => task.status === column.status)
              .sort((a, b) => a.order - b.order)}
          />
        ))}
      </div>
      </DndContext>
      <TaskDrawer/>
    </div>
  )
  
}

export default BoardPage