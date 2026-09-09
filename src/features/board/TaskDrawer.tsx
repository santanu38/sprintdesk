import { useComments } from "../../hooks/useComments"
import { useBoardStore } from "../../store/boardStore"


function TaskDrawer() {
const selectedTaskId=useBoardStore((state)=>state.selectedTaskId)
const closeTaskDrawer=useBoardStore((state)=>state.closeTaskDrawer)
const tasks=useBoardStore((state)=>state.tasks)
const task=tasks.find((t)=>t.id===selectedTaskId)
const updateTask=useBoardStore((state)=>state.updateTask)

const {data:comments,isLoading:commentsLoading}=useComments(selectedTaskId)

  if(!task) return null

return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeTaskDrawer}
      />

      {/* drawer panel */}
      <div className="relative bg-slate-800 w-full max-w-md h-full p-6 overflow-y-auto">
        <button
          onClick={closeTaskDrawer}
          className="text-slate-400 hover:text-white mb-4"
        >
          ✕ Close
        </button>

        <input
          type="text"
          value={task.title}
          onChange={(e) => updateTask(task.id, { title: e.target.value })}
          className="w-full bg-slate-700 text-white text-lg font-semibold p-2 rounded mb-4"
        />

        <textarea
          value={task.description}
          onChange={(e) => updateTask(task.id, { description: e.target.value })}
          className="w-full bg-slate-700 text-white p-2 rounded mb-4 h-24"
        />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Priority</label>
            <select
              value={task.priority}
              onChange={(e) =>
                updateTask(task.id, { priority: e.target.value as typeof task.priority })
              }
              className="w-full bg-slate-700 text-white p-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Due Date</label>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => updateTask(task.id, { dueDate: e.target.value })}
              className="w-full bg-slate-700 text-white p-2 rounded"
            />
          </div>
        </div>

        <h3 className="text-white font-medium mb-2">Comments</h3>
        {commentsLoading && <p className="text-slate-400 text-sm">Loading comments...</p>}
        <div className="space-y-2">
          {comments?.map((comment) => (
            <div key={comment.id} className="bg-slate-700 p-2 rounded text-sm text-slate-200">
              {comment.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskDrawer