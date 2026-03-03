import { ReportService } from '../../src/services/report'

describe('ReportService', () => {
  beforeEach(() => {
    ;(global as any).wx = {
      request: jest.fn(),
      setStorageSync: jest.fn(),
      getStorageSync: jest.fn(),
    }
  })

  describe('getLatestDailyReport', () => {
    it('calls http endpoint and returns report', async () => {
      const service = new ReportService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: {
            success: true,
            data: {
              _id: 'report-1',
              date: '2026-03-03',
              userId: 'u1',
              summary: { medicationCheckinRate: 100 },
              alerts: [],
            },
          },
        })
      )

      const report = await service.getLatestDailyReport()
      expect(report.date).toBe('2026-03-03')
      expect((global as any).wx.request).toHaveBeenCalled()
      const call = ((global as any).wx.request as jest.Mock).mock.calls[0][0]
      expect(call.url).toContain('/reports/daily/latest')
      expect(call.method).toBe('POST')
    })

    it('throws when API response indicates failure', async () => {
      const service = new ReportService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: { success: false, error: 'report failed' },
        })
      )

      await expect(service.getLatestDailyReport()).rejects.toThrow('report failed')
    })
  })

  describe('getDailyReports', () => {
    it('calls http endpoint', async () => {
      const service = new ReportService()
      ;(global as any).wx.request.mockImplementation(({ success }: any) =>
        success({
          data: {
            success: true,
            data: [
              {
                _id: 'report-1',
                date: '2026-03-03',
                userId: 'u1',
                summary: { medicationCheckinRate: 100 },
                alerts: [],
              },
            ],
          },
        })
      )

      const reports = await service.getDailyReports('2026-03-01', '2026-03-03')
      expect(reports).toHaveLength(1)
      expect(reports[0].date).toBe('2026-03-03')
    })
  })
})
