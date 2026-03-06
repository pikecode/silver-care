import { User as UserType } from '@silver-care/shared'

export class User {
  static async findById(id: string): Promise<UserType | null> {
    // 从数据库查询
    return null
  }

  static async findByOpenId(openId: string): Promise<UserType | null> {
    // 从数据库查询
    return null
  }

  static async create(data: Partial<UserType>): Promise<UserType> {
    // 创建新用户
    return {
      _id: 'new-id',
      openId: data.openId || '',
      nickname: data.nickname || '',
      role: data.role || 'parent',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }

  static async update(id: string, data: Partial<UserType>): Promise<UserType> {
    // 更新用户
    return {
      _id: id,
      openId: data.openId || '',
      nickname: data.nickname || '',
      role: data.role || 'parent',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }
}
