import { HealthService } from '../../src/services/health'

describe('HealthService', () => {
  beforeEach(() => {
    ;(global as any).wx = {
      request: jest.fn(),
      setStorageSync: jest.fn(),
      getStorageSync: jest.fn(),
    }
  })

  describe('recordHealthData', () => {
    it('calls REST API endpoint instead of cloud function', async () => {
      const service = new HealthService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: {
            success: true,
            data: { _id: 'record-1', type: 'blood_pressure', value: { systolic: 120, diastolic: 80 }, timestamp: Date.now() },
          },
        })
      )

      const result = await service.recordHealthData({
        type: 'blood_pressure',
        value: { systolic: 120, diastolic: 80 },
      })
      expect(result._id).toBe('record-1')
      expect((global as any).wx.request).toHaveBeenCalled()
      const call = ((global as any).wx.request as jest.Mock).mock.calls[0][0]
      expect(call.url).toContain('/health-records')
      expect(call.method).toBe('POST')
    })

    it('throws when API response indicates failure', async () => {
      const service = new HealthService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: { success: false, error: 'record failed' },
        })
      )

      await expect(
        service.recordHealthData({
          type: 'blood_pressure',
          value: { systolic: 120, diastolic: 80 },
        })
      ).rejects.toThrow('record failed')
    })
  })

  describe('getHealthRecords', () => {
    it('calls REST API endpoint', async () => {
      const service = new HealthService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: {
            success: true,
            data: [{ _id: 'record-1', type: 'blood_pressure', value: { systolic: 120, diastolic: 80 }, timestamp: Date.now() }],
          },
        })
      )

      const result = await service.getHealthRecords('blood_pressure')
      expect(result).toHaveLength(1)
      expect(result[0]._id).toBe('record-1')
    })
  })
})
