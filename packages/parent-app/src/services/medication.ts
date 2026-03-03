import { httpPost } from './http-client'

interface Medication {
  _id: string
  name: string
  dosage: string
  frequency: 'daily' | 'weekly' | 'custom'
  times: string[]
  notes?: string
  createdAt: number
  updatedAt: number
}

interface MedicationCheckin {
  _id: string
  medicationId: string
  timestamp: number
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export class MedicationService {
  async createMedication(data: {
    name: string
    dosage: string
    frequency: 'daily' | 'weekly' | 'custom'
    times: string[]
    notes?: string
  }): Promise<Medication> {
    const response = await httpPost<Medication>('/medications', data)
    if (!response.success || !response.data) {
      throw new Error(response.error || 'create medication failed')
    }
    return response.data
  }

  async getMedications(): Promise<Medication[]> {
    const response = await httpPost<Medication[]>('/medications/list', {})
    if (!response.success || !response.data) {
      throw new Error(response.error || 'get medications failed')
    }
    return response.data
  }

  async checkInMedication(medicationId: string): Promise<MedicationCheckin> {
    const response = await httpPost<MedicationCheckin>(`/medications/${medicationId}/checkins`, {})
    if (!response.success || !response.data) {
      throw new Error(response.error || 'checkin failed')
    }
    return response.data
  }

  async getMedicationCheckins(medicationId: string, date: string): Promise<MedicationCheckin[]> {
    const response = await httpPost<MedicationCheckin[]>(`/medications/${medicationId}/checkins/list`, { date })
    if (!response.success || !response.data) {
      throw new Error(response.error || 'get checkins failed')
    }
    return response.data
  }

  async updateMedication(medicationId: string, data: Partial<Medication>): Promise<Medication> {
    const response = await httpPost<Medication>(`/medications/${medicationId}`, data)
    if (!response.success || !response.data) {
      throw new Error(response.error || 'update medication failed')
    }
    return response.data
  }

  async deleteMedication(medicationId: string): Promise<void> {
    const response = await httpPost<void>(`/medications/${medicationId}/delete`, {})
    if (!response.success) {
      throw new Error(response.error || 'delete medication failed')
    }
  }
}

export const medicationService = new MedicationService()
