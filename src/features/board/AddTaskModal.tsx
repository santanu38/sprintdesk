import { useState } from "react"
import Modal from "../../components/ui/Modal"
import { useBoardStore } from "../../store/boardStore"
import type { TaskPriority } from "../../types/task.types"


function AddTaskModal() {
  const isAddModalOpen=useBoardStore((state)=>state.isAddModalOpen)
  const closeAddModal=useBoardStore((state)=>state.closeAddModal)
  
  const tasks=useBoardStore((state)=>state.tasks)
  const addTask=useBoardStore((state)=>state.addTask)
  
  const [title,setTitle]=useState("")
  const [priority,setPriority]=useState<TaskPriority>("medium")
  const [assigneeId,setAssigneeId]=useState(1)
  const [dueDate,setDueDate]=useState("")
  
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault();

       const newId=Math.max(...tasks.map((t)=>t.id),0)+1;

       addTask({
         id:newId,
         title,
        description:"",
        status:"backlog",
        priority,
        assigneeId,
        dueDate,
        sprintId:3,
        order:tasks.filter((t)=>t.status==="backlog").length+1,
        createdAt:new Date().toISOString(),
        completedAt: null,
        updatedAt:new Date().toISOString()
       })
       
       setTitle("")
        setPriority("medium")
        setAssigneeId(1)
        setDueDate("")
        closeAddModal()

  }


  return (

    <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add New Task">
      <form 
       onSubmit={handleSubmit} 
      className="space-y-4">
        <div>
          <label htmlFor="task-title" className="block text-sm text-slate-300 mb-1">
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-slate-700 text-white p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="task-priority" className="block text-sm text-slate-300 mb-1">
            Priority
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full bg-slate-700 text-white p-2 rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-assignee" className="block text-sm text-slate-300 mb-1">
            Assignee ID
          </label>
          <input
            id="task-assignee"
            type="number"
            min={1}
            max={6}
            value={assigneeId}
            onChange={(e) => setAssigneeId(Number(e.target.value))}
            className="w-full bg-slate-700 text-white p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="task-due" className="block text-sm text-slate-300 mb-1">
            Due Date
          </label>
          <input
            id="task-due"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full bg-slate-700 text-white p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create Task
        </button>
      </form>
    </Modal>
  )
}

export default AddTaskModal