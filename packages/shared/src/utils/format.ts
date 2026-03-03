import { BloodPressure } from '../types'

export function formatDate(timestamp: number, format: string = 'YYYY-MM-DD'): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`
  return format
}

export function formatTime(timestamp: number, format: string = 'HH:mm'): string {
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  if (format === 'HH:mm') return `${hours}:${minutes}`
  return format
}

export function formatDateTime(timestamp: number, format: string = 'YYYY-MM-DD HH:mm'): string {
  return `${formatDate(timestamp)} ${formatTime(timestamp)}`
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals)
}

export function formatCurrency(value: number, currency: string = '¥'): string {
  return `${currency}${value.toFixed(2)}`
}

export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`
}

export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
}

export function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export function formatBloodPressure(bp: BloodPressure): string {
  return `${bp.systolic}/${bp.diastolic} mmHg`
}

export function formatBloodSugar(value: number): string {
  return `${value} mg/dL`
}
