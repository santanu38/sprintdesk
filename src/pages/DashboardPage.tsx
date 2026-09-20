import Navbar from "../components/layout/Navbar"
import DataTable from "../components/ui/DataTable"
import StatCard from "../components/ui/StatCard"
import { useBaord } from "../hooks/useBoard"
import { useAuthStore } from "../store/authStore"
import type { Task } from "../types/task.types"



function DashboardPage() {
  const {tasks,isLoading}=useBaord()
  const user=useAuthStore((state)=>state.user)

  const totalTasks=tasks.length
  const backlogCount=tasks.filter((task)=>task.status==="backlog").length
  const inProgressCount=tasks.filter((task)=>task.status==="in-progress").length
  const doneCount=tasks.filter((task)=>task.status==="done").length

  const upcomingTasks=[...tasks]
  .filter((task)=>task.status!=="done")
  .sort((a,b)=>a.dueDate.localeCompare(b.dueDate))
  .slice(0,5)

  if(isLoading){
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="text-white p-8">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
       <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-1">
          Welcome back{user ? `, ${user.firstName}` : ""}
        </h1>
        <p className="text-slate-400 text-sm mb-6">Here's what's happening with your sprint.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          
          <StatCard label="Total Tasks" value={totalTasks} />
          <StatCard label="Backlog" value={backlogCount} accentColor="text-slate-300" />
          <StatCard label="In Progress" value={inProgressCount} accentColor="text-yellow-400" />
          <StatCard label="Done" value={doneCount} accentColor="text-green-400" />
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <h2 className="text-white font-semibold mb-4">Upcoming Due Dates</h2>
          
          <DataTable<Task>
            columns={[
              { key: "title", header: "Task" },
              { key: "priority", header: "Priority" },
              { key: "dueDate", header: "Due Date" },
              { key: "status", header: "Status" },
            ]}
            data={upcomingTasks}
            keyExtractor={(task) => task.id}
            emptyMessage="No upcoming tasks — nice work!"
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage