import {
  isToday,
  isYesterday,
  isSameDay,
  getDayOfWeek,
  getWeekRange,
  getMonthRange,
  addDays,
  addMonths,
} from '../../src/utils/date'

describe('Date Utils', () => {
  describe('isToday', () => {
    it('should return true for today', () => {
      expect(isToday(Date.now())).toBe(true)
    })

    it('should return false for yesterday', () => {
      const yesterday = Date.now() - 24 * 60 * 60 * 1000
      expect(isToday(yesterday)).toBe(false)
    })
  })

  describe('isYesterday', () => {
    it('should return true for yesterday', () => {
      const yesterday = Date.now() - 24 * 60 * 60 * 1000
      expect(isYesterday(yesterday)).toBe(true)
    })

    it('should return false for today', () => {
      expect(isYesterday(Date.now())).toBe(false)
    })
  })

  describe('isSameDay', () => {
    it('should return true for same day', () => {
      const time1 = new Date('2026-03-03T10:00:00').getTime()
      const time2 = new Date('2026-03-03T20:00:00').getTime()
      expect(isSameDay(time1, time2)).toBe(true)
    })

    it('should return false for different days', () => {
      const time1 = new Date('2026-03-03T10:00:00').getTime()
      const time2 = new Date('2026-03-04T10:00:00').getTime()
      expect(isSameDay(time1, time2)).toBe(false)
    })
  })

  describe('getDayOfWeek', () => {
    it('should return day of week', () => {
      const timestamp = new Date('2026-03-03').getTime() // Tuesday
      expect(getDayOfWeek(timestamp)).toBe('Tuesday')
    })
  })

  describe('getWeekRange', () => {
    it('should return week range', () => {
      const timestamp = new Date('2026-03-03').getTime()
      const range = getWeekRange(timestamp)
      expect(range.start).toBeLessThan(range.end)
    })
  })

  describe('getMonthRange', () => {
    it('should return month range', () => {
      const timestamp = new Date('2026-03-15').getTime()
      const range = getMonthRange(timestamp)
      expect(range.start).toBeLessThan(range.end)
    })
  })

  describe('addDays', () => {
    it('should add days to timestamp', () => {
      const timestamp = new Date('2026-03-03').getTime()
      const result = addDays(timestamp, 5)
      expect(isSameDay(result, new Date('2026-03-08').getTime())).toBe(true)
    })
  })

  describe('addMonths', () => {
    it('should add months to timestamp', () => {
      const timestamp = new Date('2026-03-03').getTime()
      const result = addMonths(timestamp, 1)
      const resultDate = new Date(result)
      expect(resultDate.getMonth()).toBe(3) // April (0-indexed)
    })
  })
})
