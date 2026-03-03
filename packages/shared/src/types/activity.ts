export type ActivityCategory = 'health' | 'social' | 'education' | 'entertainment'
export type ActivityStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'

export interface Activity {
  _id: string
  stationId: string
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  category: ActivityCategory
  image?: string
  status: ActivityStatus
  createdBy: string
  createdAt: number
  updatedAt: number
}

export interface ActivityRegistration {
  _id: string
  activityId: string
  userId: string
  registeredAt: number
  checkedIn: boolean
  checkinAt?: number
}

export interface ActivityStats {
  totalRegistrations: number
  checkins: number
  participationRate: number
}
