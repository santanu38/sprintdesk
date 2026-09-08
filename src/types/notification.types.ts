

export type NotificationType="task" | "review"

export interface AppNotification{
    id: number
  title: string
  message: string
  type: NotificationType
  read: boolean
  createdAt: string
}