import { DailyReport, ApiResponse } from '@silver-care/shared'

const DEPRECATION_MESSAGE = 'This cloud function has been deprecated. Please use the REST API instead: POST /api/v1/reports/daily/*'

// 生成日报
export async function generateDailyReport(
  userId: string,
  date: string
): Promise<ApiResponse<DailyReport>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 获取日报列表
export async function getDailyReports(
  userId: string,
  startDate: string,
  endDate: string
): Promise<ApiResponse<DailyReport[]>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

// 获取最新日报
export async function getLatestDailyReport(userId: string): Promise<ApiResponse<DailyReport>> {
  return { success: false, error: DEPRECATION_MESSAGE, code: 410 }
}

