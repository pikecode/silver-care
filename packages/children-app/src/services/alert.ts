import { Alert, ApiResponse } from '@silver-care/shared'

export class AlertService {
  async createAlert(data: {
    type: string
    severity: 'low' | 'medium' | 'high'
    message: string
  }): Promise<Alert> {
    const response = await this.callCloudFunction('createAlert', data)
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async getAlerts(unreadOnly?: boolean): Promise<Alert[]> {
    const response = await this.callCloudFunction('getAlerts', { unreadOnly })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async markAlertAsRead(alertId: string): Promise<Alert> {
    const response = await this.callCloudFunction('markAlertAsRead', { alertId })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async deleteAlert(alertId: string): Promise<void> {
    const response = await this.callCloudFunction('deleteAlert', { alertId })
    if (!response.success) {
      throw new Error(response.error)
    }
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

export const alertService = new AlertService()
