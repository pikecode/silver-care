// 用户相关类型
export interface User {
  id: string
  name: string
  phone: string
  role: 'parent' | 'child' | 'admin'
  createdAt: number
}

export interface Family {
  id: string
  parentId: string
  childrenIds: string[]
  createdAt: number
}

// 健康数据类型
export interface HealthRecord {
  id: string
  userId: string
  type: 'medication' | 'bloodPressure' | 'bloodSugar'
  value: string
  timestamp: number
}

export interface MedicationReminder {
  id: string
  userId: string
  medicationName: string
  dosage: string
  time: string
  frequency: 'daily' | 'weekly' | 'monthly'
  isActive: boolean
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  code?: number
}
