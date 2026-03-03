import { MedicationService } from '../../src/services/medication'

describe('MedicationService', () => {
  beforeEach(() => {
    ;(global as any).wx = {
      request: jest.fn(),
      setStorageSync: jest.fn(),
      getStorageSync: jest.fn(),
    }
  })

  describe('checkInMedication', () => {
    it('calls REST API endpoint instead of cloud function', async () => {
      const service = new MedicationService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: {
            success: true,
            data: { _id: 'checkin-1', medicationId: 'med-1', timestamp: Date.now() },
          },
        })
      )

      const result = await service.checkInMedication('med-1')
      expect(result._id).toBe('checkin-1')
      expect((global as any).wx.request).toHaveBeenCalled()
      const call = ((global as any).wx.request as jest.Mock).mock.calls[0][0]
      expect(call.url).toContain('/medications/med-1/checkins')
      expect(call.method).toBe('POST')
    })

    it('throws when API response indicates failure', async () => {
      const service = new MedicationService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: { success: false, error: 'checkin failed' },
        })
      )

      await expect(service.checkInMedication('med-1')).rejects.toThrow('checkin failed')
    })
  })

  describe('getMedications', () => {
    it('calls REST API endpoint', async () => {
      const service = new MedicationService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: {
            success: true,
            data: [{ _id: 'med-1', name: 'Aspirin', dosage: '100mg', frequency: 'daily', times: ['08:00'] }],
          },
        })
      )

      const result = await service.getMedications()
      expect(result).toHaveLength(1)
      expect(result[0]._id).toBe('med-1')
    })
  })
})
