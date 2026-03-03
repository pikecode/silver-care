export type UserRole = 'parent' | 'child' | 'admin'

export interface User {
  _id: string
  openId: string
  unionId?: string
  nickname: string
  avatar?: string
  phone?: string
  role: UserRole
  familyId?: string
  createdAt: number
  updatedAt: number
  lastLoginAt?: number
}

export interface FamilyMember {
  userId: string
  role: 'parent' | 'child'
  joinedAt: number
}

export interface Family {
  _id: string
  name: string
  createdBy: string
  members: FamilyMember[]
  createdAt: number
  updatedAt: number
}

export interface UserProfile {
  userId: string
  name: string
  age: number
  phone: string
  avatar?: string
  idCard?: string
  address?: string
  emergencyContact?: string
  diseases?: string[]
}
