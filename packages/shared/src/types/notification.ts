export type NotificationType = 'medication_reminder' | 'daily_report' | 'alert' | 'order_update' | 'activity_reminder'

export interface Notification {
  _id: string
  userId: string
  type: NotificationType
  title: string
  content: string
  data?: Record<string, any>
  read: boolean
  createdAt: number
}
