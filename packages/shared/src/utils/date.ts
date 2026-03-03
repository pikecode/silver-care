export function isToday(timestamp: number): boolean {
  const today = new Date()
  const date = new Date(timestamp)
  return date.toDateString() === today.toDateString()
}

export function isYesterday(timestamp: number): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const date = new Date(timestamp)
  return date.toDateString() === yesterday.toDateString()
}

export function isSameDay(timestamp1: number, timestamp2: number): boolean {
  const date1 = new Date(timestamp1)
  const date2 = new Date(timestamp2)
  return date1.toDateString() === date2.toDateString()
}

export function getDayOfWeek(timestamp: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[new Date(timestamp).getDay()]
}

export function getWeekRange(timestamp: number): { start: number; end: number } {
  const date = new Date(timestamp)
  const day = date.getDay()
  const start = new Date(date)
  start.setDate(date.getDate() - day)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start: start.getTime(), end: end.getTime() }
}

export function getMonthRange(timestamp: number): { start: number; end: number } {
  const date = new Date(timestamp)
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return { start: start.getTime(), end: end.getTime() }
}

export function addDays(timestamp: number, days: number): number {
  const date = new Date(timestamp)
  date.setDate(date.getDate() + days)
  return date.getTime()
}

export function addMonths(timestamp: number, months: number): number {
  const date = new Date(timestamp)
  date.setMonth(date.getMonth() + months)
  return date.getTime()
}
