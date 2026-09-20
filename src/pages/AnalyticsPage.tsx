import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  ResponsiveContainer,
} from "recharts"

import Navbar from "../components/layout/Navbar"
import { useBaord } from "../hooks/useBoard"
import { getCompletionTrend, getPriorityBreakdown, getSPrintVelocity, getTaskStatusDistribution } from "../lib/analytics"
import { useMemo } from "react"

const STATUS_COLORS: Record<string, string> = {
  backlog: "#64748b",
  "in-progress": "#eab308",
  review: "#a855f7",
  done: "#22c55e",
}

const PRIORITY_COLORS: Record<string, string> = {
  low: "#64748b",
  medium: "#eab308",
  high: "#ef4444",
}


function AnalyticsPage() {
  const {tasks,isLoading}=useBaord()

  if(isLoading){
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="text-white p-8">Loading analytics...</div>
      </div>
    )
  }
  
  const statusData=useMemo(()=>getTaskStatusDistribution(tasks),[tasks])
  const priorityData=useMemo(()=>getPriorityBreakdown(tasks),[tasks])
  const completionData=useMemo(()=>getCompletionTrend(tasks),[tasks])
  const velocityData=useMemo(()=>getSPrintVelocity(tasks),[tasks])



  return (
    
    <div className="min-h-screen bg-slate-900">
         <Navbar/>
         <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sprint velocity */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h2 className="text-white font-semibold mb-4">Sprint Velocity</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={velocityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="sprintId" stroke="#94a3b8" tickFormatter={(id) => `Sprint ${id}`} />
                    <YAxis stroke="#94a3b8" allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
                    <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

             {/* Task Status Distribution */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h2 className="text-white font-semibold mb-4">Task Status</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                     label={(entry: unknown) => {
                      const data = entry as { status: string; count: number }
                      return `${data.status}: ${data.count}`
                    }}
                    >
                      {statusData.map((entry) => (
                        <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Priority Breakdown */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h2 className="text-white font-semibold mb-4">Priority Breakdown</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={priorityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="priority" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {priorityData.map((entry) => (
                        <Cell key={entry.priority} fill={PRIORITY_COLORS[entry.priority]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Completion Trend */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h2 className="text-white font-semibold mb-4">Completion Trend</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={completionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
                    <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>


         </div>
    </div>
    
    
  )
}

export default AnalyticsPage