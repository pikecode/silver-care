import { httpPost } from './http-client'

interface HealthRecord {
  _id: string
  type: 'blood_pressure' | 'blood_sugar'
  value: any
  timestamp: number
  notes?: string
}

interface HealthTrend {
  type: string
  average: number
  trend: 'up' | 'down' | 'stable'
  data: { date: string; value: number }[]
}

interface Alert {
  _id: string
  type: string
  message: string
  timestamp: number
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export class HealthService {
  async recordHealthData(data: {
    type: 'blood_pressure' | 'blood_sugar'
    value: any
    notes?: string
  }): Promise<HealthRecord> {
    const response = await httpPost<HealthRecord>('/health-records', data)
    if (!response.success || !response.data) {
      throw new Error(response.error || 'record failed')
    }
    return response.data
  }

  async getHealthRecords(type?: string): Promise<HealthRecord[]> {
    const response = await httpPost<HealthRecord[]>('/health-records/list', { type })
    if (!response.success || !response.data) {
      throw new Error(response.error || 'get records failed')
    }
    return response.data
  }

  async getHealthTrend(type: string, days: number): Promise<HealthTrend> {
    const response = await httpPost<HealthTrend>('/health-records/trend', { type, days })
    if (!response.success || !response.data) {
      throw new Error(response.error || 'get trend failed')
    }
    return response.data
  }

  async checkAnomalies(): Promise<Alert[]> {
    const response = await httpPost<Alert[]>('/health-records/anomalies', {})
    if (!response.success || !response.data) {
      throw new Error(response.error || 'check anomalies failed')
    }
    return response.data
  }
}

export const healthService = new HealthService()
