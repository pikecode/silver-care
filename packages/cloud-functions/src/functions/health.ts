import { HealthRecord, HealthTrend, Alert, ApiResponse, BloodPressure } from '@silver-care/shared'

const DEPRECATION_MESSAGE = 'This cloud function has been deprecated. Please use the REST API instead: POST /api/v1/health-records/*'

// 记录健康数据（血压/血糖）
export async function recordHealthData(data: {
  userId: string
  type: 'blood_pressure' | 'blood_sugar'
  value: any
  notes?: string
}): Promise<ApiResponse<HealthRecord>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 获取健康记录
export async function getHealthRecords(
  userId: string,
  type?: string
): Promise<ApiResponse<HealthRecord[]>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 获取健康趋势
export async function getHealthTrend(
  userId: string,
  type: string,
  days: number
): Promise<ApiResponse<HealthTrend>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 检测异常
export async function checkAnomalies(userId: string): Promise<ApiResponse<Alert[]>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

