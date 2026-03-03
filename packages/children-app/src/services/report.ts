import { httpPost } from './http-client'

interface DailyReport {
  _id: string
  date: string
  userId: string
  summary: {
    medicationCheckinRate: number
  }
  alerts: Array<{
    _id: string
    type: string
    message: string
  }>
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export class ReportService {
  async generateDailyReport(date: string): Promise<DailyReport> {
    const response = await httpPost<DailyReport>('/reports/daily/generate', { date })
    if (!response.success || !response.data) {
      throw new Error(response.error || 'generate report failed')
    }
    return response.data
  }

  async getDailyReports(startDate: string, endDate: string): Promise<DailyReport[]> {
    const response = await httpPost<DailyReport[]>('/reports/daily/list', { startDate, endDate })
    if (!response.success || !response.data) {
      throw new Error(response.error || 'get reports failed')
    }
    return response.data
  }

  async getLatestDailyReport(): Promise<DailyReport> {
    const response = await httpPost<DailyReport>('/reports/daily/latest', {})
    if (!response.success || !response.data) {
      throw new Error(response.error || 'get latest report failed')
    }
    return response.data
  }
}

export const reportService = new ReportService()
