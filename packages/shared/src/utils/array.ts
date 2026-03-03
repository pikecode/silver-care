export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export function unique<T>(array: T[], key?: (item: T) => any): T[] {
  if (!key) return [...new Set(array)]
  const seen = new Set()
  return array.filter(item => {
    const k = key(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

export function groupBy<T>(array: T[], key: (item: T) => string): Record<string, T[]> {
  return array.reduce((result, item) => {
    const k = key(item)
    if (!result[k]) result[k] = []
    result[k].push(item)
    return result
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: (item: T) => any, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = key(a)
    const bVal = key(b)
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

export function flatten<T>(array: T[][]): T[] {
  return array.reduce((result, item) => result.concat(item), [])
}

export function compact<T>(array: (T | null | undefined)[]): T[] {
  return array.filter((item): item is T => item != null)
}
