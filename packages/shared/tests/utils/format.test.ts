import {
  formatDate,
  formatTime,
  formatDateTime,
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatPhone,
  maskPhone,
  formatBloodPressure,
  formatBloodSugar,
} from '../../src/utils/format'

describe('Format Utils', () => {
  describe('formatDate', () => {
    it('should format timestamp to YYYY-MM-DD', () => {
      const timestamp = new Date('2026-03-03').getTime()
      expect(formatDate(timestamp)).toBe('2026-03-03')
    })

    it('should handle different dates', () => {
      const timestamp = new Date('2025-01-15').getTime()
      expect(formatDate(timestamp)).toBe('2025-01-15')
    })

    it('should handle custom format parameter', () => {
      const timestamp = new Date('2026-03-03').getTime()
      expect(formatDate(timestamp, 'custom')).toBe('custom')
    })
  })

  describe('formatTime', () => {
    it('should format timestamp to HH:mm', () => {
      const timestamp = new Date('2026-03-03T14:30:00').getTime()
      expect(formatTime(timestamp)).toBe('14:30')
    })

    it('should pad single digit hours and minutes', () => {
      const timestamp = new Date('2026-03-03T09:05:00').getTime()
      expect(formatTime(timestamp)).toBe('09:05')
    })

    it('should handle custom format parameter', () => {
      const timestamp = new Date('2026-03-03T14:30:00').getTime()
      expect(formatTime(timestamp, 'custom')).toBe('custom')
    })
  })

  describe('formatDateTime', () => {
    it('should format timestamp to YYYY-MM-DD HH:mm', () => {
      const timestamp = new Date('2026-03-03T14:30:00').getTime()
      expect(formatDateTime(timestamp)).toContain('2026-03-03')
      expect(formatDateTime(timestamp)).toContain('14:30')
    })
  })

  describe('formatNumber', () => {
    it('should format number with decimals', () => {
      expect(formatNumber(3.14159, 2)).toBe('3.14')
      expect(formatNumber(100, 0)).toBe('100')
    })
  })

  describe('formatCurrency', () => {
    it('should format currency with default symbol', () => {
      expect(formatCurrency(99.99)).toBe('¥99.99')
    })

    it('should format currency with custom symbol', () => {
      expect(formatCurrency(99.99, '$')).toBe('$99.99')
    })
  })

  describe('formatPercentage', () => {
    it('should format percentage', () => {
      expect(formatPercentage(0.5)).toBe('50%')
      expect(formatPercentage(0.333, 1)).toBe('33.3%')
    })
  })

  describe('formatPhone', () => {
    it('should format phone number', () => {
      expect(formatPhone('13800138000')).toBe('138 0013 8000')
    })
  })

  describe('maskPhone', () => {
    it('should mask phone number', () => {
      expect(maskPhone('13800138000')).toBe('138****8000')
    })
  })

  describe('formatBloodPressure', () => {
    it('should format blood pressure', () => {
      expect(formatBloodPressure({ systolic: 120, diastolic: 80 })).toBe('120/80 mmHg')
    })
  })

  describe('formatBloodSugar', () => {
    it('should format blood sugar', () => {
      expect(formatBloodSugar(100)).toBe('100 mg/dL')
    })
  })
})
