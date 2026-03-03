import { z } from 'zod'

export function isEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

export function isIdCard(idCard: string): boolean {
  return /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(idCard)
}

export function isUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isStrongPassword(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
}

export function validateSchema<T>(data: any, schema: z.ZodSchema<T>): { valid: boolean; errors?: string[] } {
  try {
    schema.parse(data)
    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error.errors.map(e => e.message) }
    }
    return { valid: false, errors: ['Unknown error'] }
  }
}
