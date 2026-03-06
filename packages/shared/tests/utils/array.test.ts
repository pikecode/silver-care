import {
  chunk,
  unique,
  groupBy,
  sortBy,
  flatten,
  compact,
} from '../../src/utils/array'

describe('Array Utils', () => {
  describe('chunk', () => {
    it('should chunk array into smaller arrays', () => {
      const result = chunk([1, 2, 3, 4, 5], 2)
      expect(result).toEqual([[1, 2], [3, 4], [5]])
    })

    it('should handle empty array', () => {
      expect(chunk([], 2)).toEqual([])
    })

    it('should handle chunk size larger than array', () => {
      const result = chunk([1, 2], 5)
      expect(result).toEqual([[1, 2]])
    })
  })

  describe('unique', () => {
    it('should remove duplicates', () => {
      const result = unique([1, 2, 2, 3, 3, 3])
      expect(result).toEqual([1, 2, 3])
    })

    it('should use key function for uniqueness', () => {
      const items = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 1, name: 'c' },
      ]
      const result = unique(items, item => item.id)
      expect(result).toHaveLength(2)
    })

    it('should handle empty array', () => {
      expect(unique([])).toEqual([])
    })
  })

  describe('groupBy', () => {
    it('should group items by key', () => {
      const items = [
        { type: 'a', value: 1 },
        { type: 'b', value: 2 },
        { type: 'a', value: 3 },
      ]
      const result = groupBy(items, item => item.type)
      expect(result.a).toHaveLength(2)
      expect(result.b).toHaveLength(1)
    })
  })

  describe('sortBy', () => {
    it('should sort array ascending', () => {
      const items = [{ value: 3 }, { value: 1 }, { value: 2 }]
      const result = sortBy(items, item => item.value, 'asc')
      expect(result[0].value).toBe(1)
      expect(result[2].value).toBe(3)
    })

    it('should sort array descending', () => {
      const items = [{ value: 3 }, { value: 1 }, { value: 2 }]
      const result = sortBy(items, item => item.value, 'desc')
      expect(result[0].value).toBe(3)
      expect(result[2].value).toBe(1)
    })

    it('should handle equal values', () => {
      const items = [{ value: 2 }, { value: 1 }, { value: 1 }]
      const result = sortBy(items, item => item.value, 'asc')
      expect(result[0].value).toBe(1)
      expect(result[1].value).toBe(1)
      expect(result[2].value).toBe(2)
    })
  })

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      const result = flatten([[1, 2], [3, 4], [5]])
      expect(result).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('compact', () => {
    it('should remove null and undefined', () => {
      const result = compact([1, null, 2, undefined, 3])
      expect(result).toEqual([1, 2, 3])
    })
  })
})
