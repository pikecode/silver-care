import { DailyReport, ApiResponse } from '@silver-care/shared'

export class ReportService {
  async generateDailyReport(date: string): Promise<DailyReport> {
    const response = await this.callCloudFunction('generateDailyReport', { date })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async getDailyReports(startDate: string, endDate: string): Promise<DailyReport[]> {
    const response = await this.callCloudFunction('getDailyReports', { startDate, endDate })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async getLatestDailyReport(): Promise<DailyReport> {
    const response = await this.callCloudFunction('getLatestDailyReport', {})
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  private async callCloudFunction(name: string, data: any): Promise<ApiResponse<any>> {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name,
        data,
        success: (res: any) => resolve(res.result),
        fail: (err: any) => reject(err),
      })
    })
  }
}

export const reportService = new ReportService()
