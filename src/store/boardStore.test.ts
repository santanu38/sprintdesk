import { describe, it, expect, beforeEach } from "vitest"
import { useBoardStore } from "./boardStore"
import type { Task } from "../types/task.types"

const mockTask: Task = {
  id: 1,
  title: "Test task",
  description: "A task for testing",
  status: "backlog",
  priority: "medium",
  assigneeId: 1,
  dueDate: "2026-09-01",
  sprintId: 1,
  order: 1,
  createdAt: "2026-08-01T00:00:00Z",
  completedAt: null,
  updatedAt: "2026-08-01T00:00:00Z",
}

describe("boardStore", () => {
  beforeEach(() => {
    useBoardStore.setState({ tasks: [], selectedTaskId: null, isAddModalOpen: false })
  })

  it("adds a task", () => {
    useBoardStore.getState().addTask(mockTask)

    const tasks = useBoardStore.getState().tasks
    expect(tasks).toHaveLength(1)
    expect(tasks[0]!.title).toBe("Test task")
  })

  it("moves a task to a new status and order", () => {
    useBoardStore.getState().addTask(mockTask)

    useBoardStore.getState().moveTask(1, "in-progress", 2)

    const tasks = useBoardStore.getState().tasks
    expect(tasks[0]!.status).toBe("in-progress")
    expect(tasks[0]!.order).toBe(2)
  })

  it("does not affect other tasks when moving one task", () => {
    const secondTask: Task = { ...mockTask, id: 2, title: "Second task" }
    useBoardStore.getState().addTask(mockTask)
    useBoardStore.getState().addTask(secondTask)

    useBoardStore.getState().moveTask(1, "done", 1)

    const tasks = useBoardStore.getState().tasks
    const untouchedTask = tasks.find((t) => t.id === 2)
    expect(untouchedTask!.status).toBe("backlog")
  })

  it("deletes a task", () => {
    useBoardStore.getState().addTask(mockTask)
    expect(useBoardStore.getState().tasks).toHaveLength(1)

    useBoardStore.getState().deleteTask(1)

    expect(useBoardStore.getState().tasks).toHaveLength(0)
  })

  it("updates a task's fields", () => {
    useBoardStore.getState().addTask(mockTask)

    useBoardStore.getState().updateTask(1, { title: "Updated title" })

    const tasks = useBoardStore.getState().tasks
    expect(tasks[0]!.title).toBe("Updated title")
    expect(tasks[0]!.priority).toBe("medium") // unchanged fields stay intact
  })
})