import { Medication, MedicationCheckin, ApiResponse } from '@silver-care/shared'

const DEPRECATION_MESSAGE = 'This cloud function has been deprecated. Please use the REST API instead: POST /api/v1/medications'

// 创建用药提醒
export async function createMedication(data: {
  userId: string
  name: string
  dosage: string
  frequency: 'daily' | 'weekly' | 'custom'
  times: string[]
  notes?: string
}): Promise<ApiResponse<Medication>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 获取用户的所有用药提醒
export async function getMedications(userId: string): Promise<ApiResponse<Medication[]>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 记录用药打卡
export async function checkInMedication(medicationId: string, userId: string): Promise<ApiResponse<MedicationCheckin>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 获取用药打卡记录
export async function getMedicationCheckins(userId: string, date: string): Promise<ApiResponse<MedicationCheckin[]>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 更新用药提醒
export async function updateMedication(medicationId: string, data: Partial<Medication>): Promise<ApiResponse<Medication>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 删除用药提醒
export async function deleteMedication(medicationId: string): Promise<ApiResponse<{ success: boolean }>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

