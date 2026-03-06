import { Medication as MedicationType } from '@silver-care/shared'

export class Medication {
  static async findById(id: string): Promise<MedicationType | null> {
    // 从数据库查询
    return null
  }

  static async findByUserId(userId: string): Promise<MedicationType[]> {
    // 查询用户的所有用药提醒
    return []
  }

  static async create(data: Partial<MedicationType>): Promise<MedicationType> {
    // 创建新用药提醒
    return {
      _id: 'new-med-id',
      userId: data.userId || '',
      name: data.name || '',
      dosage: data.dosage || '',
      frequency: data.frequency || 'daily',
      times: data.times || [],
      notes: data.notes,
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }

  static async update(id: string, data: Partial<MedicationType>): Promise<MedicationType> {
    // 更新用药提醒
    return {
      _id: id,
      userId: data.userId || '',
      name: data.name || '',
      dosage: data.dosage || '',
      frequency: data.frequency || 'daily',
      times: data.times || [],
      notes: data.notes,
      active: data.active !== undefined ? data.active : true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }

  static async delete(id: string): Promise<void> {
    // 删除用药提醒
  }
}
