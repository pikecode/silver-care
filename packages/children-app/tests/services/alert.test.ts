import { AlertService } from '../../src/services/alert'

describe('AlertService', () => {
  beforeEach(() => {
    ;(global as any).wx = {
      request: jest.fn(),
      setStorageSync: jest.fn(),
      getStorageSync: jest.fn(),
    }
  })

  describe('getAlerts', () => {
    it('calls http endpoint and returns alerts', async () => {
      const service = new AlertService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: {
            success: true,
            data: [
              {
                _id: 'alert-1',
                type: 'medication_missed',
                severity: 'high',
                message: 'Medication missed',
                timestamp: Date.now(),
              },
            ],
          },
        })
      )

      const alerts = await service.getAlerts()
      expect(alerts).toHaveLength(1)
      expect(alerts[0]._id).toBe('alert-1')
      expect((global as any).wx.request).toHaveBeenCalled()
      const call = ((global as any).wx.request as jest.Mock).mock.calls[0][0]
      expect(call.url).toContain('/alerts')
      expect(call.method).toBe('POST')
    })

    it('throws when API response indicates failure', async () => {
      const service = new AlertService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: { success: false, error: 'get alerts failed' },
        })
      )

      await expect(service.getAlerts()).rejects.toThrow('get alerts failed')
    })
  })

  describe('markAlertAsRead', () => {
    it('calls http endpoint', async () => {
      const service = new AlertService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: {
            success: true,
            data: {
              _id: 'alert-1',
              type: 'medication_missed',
              severity: 'high',
              message: 'Medication missed',
              timestamp: Date.now(),
              read: true,
            },
          },
        })
      )

      const alert = await service.markAlertAsRead('alert-1')
      expect(alert._id).toBe('alert-1')
      expect(alert.read).toBe(true)
    })
  })
})
