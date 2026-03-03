import { httpPost } from './http-client'

interface Alert {
  _id: string
  type: string
  severity: 'low' | 'medium' | 'high'
  message: string
  timestamp: number
  read?: boolean
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export class AlertService {
  async createAlert(data: {
    type: string
    severity: 'low' | 'medium' | 'high'
    message: string
  }): Promise<Alert> {
    const response = await httpPost<Alert>('/alerts', data)
    if (!response.success || !response.data) {
      throw new Error(response.error || 'create alert failed')
    }
    return response.data
  }

  async getAlerts(unreadOnly?: boolean): Promise<Alert[]> {
    const response = await httpPost<Alert[]>('/alerts/list', { unreadOnly })
    if (!response.success || !response.data) {
      throw new Error(response.error || 'get alerts failed')
    }
    return response.data
  }

  async markAlertAsRead(alertId: string): Promise<Alert> {
    const response = await httpPost<Alert>(`/alerts/${alertId}/read`, {})
    if (!response.success || !response.data) {
      throw new Error(response.error || 'mark alert as read failed')
    }
    return response.data
  }

  async deleteAlert(alertId: string): Promise<void> {
    const response = await httpPost<void>(`/alerts/${alertId}/delete`, {})
    if (!response.success) {
      throw new Error(response.error || 'delete alert failed')
    }
  }
}

export const alertService = new AlertService()
