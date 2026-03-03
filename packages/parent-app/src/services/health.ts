import { HealthRecord, HealthTrend, Alert, ApiResponse } from '@silver-care/shared'

export class HealthService {
  async recordHealthData(data: {
    type: 'blood_pressure' | 'blood_sugar'
    value: any
    notes?: string
  }): Promise<HealthRecord> {
    const response = await this.callCloudFunction('recordHealthData', data)
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async getHealthRecords(type?: string): Promise<HealthRecord[]> {
    const response = await this.callCloudFunction('getHealthRecords', { type })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async getHealthTrend(type: string, days: number): Promise<HealthTrend> {
    const response = await this.callCloudFunction('getHealthTrend', { type, days })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async checkAnomalies(): Promise<Alert[]> {
    const response = await this.callCloudFunction('checkAnomalies', {})
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

export const healthService = new HealthService()
