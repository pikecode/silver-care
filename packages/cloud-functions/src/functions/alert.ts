import { Alert, ApiResponse } from '@silver-care/shared'

const DEPRECATION_MESSAGE = 'This cloud function has been deprecated. Please use the REST API instead: POST /api/v1/alerts/*'

// 创建预警
export async function createAlert(data: {
  userId: string
  type: string
  severity: 'low' | 'medium' | 'high'
  message: string
}): Promise<ApiResponse<Alert>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 获取预警列表
export async function getAlerts(
  userId: string,
  unreadOnly?: boolean
): Promise<ApiResponse<Alert[]>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 标记预警为已读
export async function markAlertAsRead(alertId: string): Promise<ApiResponse<Alert>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 删除预警
export async function deleteAlert(alertId: string): Promise<ApiResponse<{ success: boolean }>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

