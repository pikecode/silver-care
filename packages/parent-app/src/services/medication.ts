import { Medication, MedicationCheckin, ApiResponse } from '@silver-care/shared'

export class MedicationService {
  async createMedication(data: {
    name: string
    dosage: string
    frequency: 'daily' | 'weekly' | 'custom'
    times: string[]
    notes?: string
  }): Promise<Medication> {
    const response = await this.callCloudFunction('createMedication', data)
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async getMedications(userId: string): Promise<Medication[]> {
    const response = await this.callCloudFunction('getMedications', { userId })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async checkInMedication(medicationId: string, userId: string): Promise<MedicationCheckin> {
    const response = await this.callCloudFunction('checkInMedication', { medicationId, userId })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async getMedicationCheckins(userId: string, date: string): Promise<MedicationCheckin[]> {
    const response = await this.callCloudFunction('getMedicationCheckins', { userId, date })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async updateMedication(medicationId: string, data: Partial<Medication>): Promise<Medication> {
    const response = await this.callCloudFunction('updateMedication', { medicationId, ...data })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async deleteMedication(medicationId: string): Promise<void> {
    const response = await this.callCloudFunction('deleteMedication', { medicationId })
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

export const medicationService = new MedicationService()
