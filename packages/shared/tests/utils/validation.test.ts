import {
  isEmail,
  isPhone,
  isIdCard,
  isUrl,
  isStrongPassword,
  validateSchema,
} from '../../src/utils/validation'
import { z } from 'zod'

describe('Validation Utils', () => {
  describe('isEmail', () => {
    it('should validate email', () => {
      expect(isEmail('test@example.com')).toBe(true)
      expect(isEmail('invalid-email')).toBe(false)
    })
  })

  describe('isPhone', () => {
    it('should validate phone number', () => {
      expect(isPhone('13800138000')).toBe(true)
      expect(isPhone('12345678901')).toBe(false)
    })
  })

  describe('isIdCard', () => {
    it('should validate ID card', () => {
      // Valid ID card format
      expect(isIdCard('110101199003071234')).toBe(true)
      expect(isIdCard('invalid')).toBe(false)
    })
  })

  describe('isUrl', () => {
    it('should validate URL', () => {
      expect(isUrl('https://example.com')).toBe(true)
      expect(isUrl('not-a-url')).toBe(false)
    })
  })

  describe('isStrongPassword', () => {
    it('should validate strong password', () => {
      expect(isStrongPassword('StrongPass123!')).toBe(true)
      expect(isStrongPassword('weak')).toBe(false)
    })

    it('should require uppercase letter', () => {
      expect(isStrongPassword('strongpass123!')).toBe(false)
    })

    it('should require lowercase letter', () => {
      expect(isStrongPassword('STRONGPASS123!')).toBe(false)
    })

    it('should require digit', () => {
      expect(isStrongPassword('StrongPass!')).toBe(false)
    })

    it('should require special character', () => {
      expect(isStrongPassword('StrongPass123')).toBe(false)
    })

    it('should require minimum 8 characters', () => {
      expect(isStrongPassword('Str1!')).toBe(false)
    })
  })

  describe('validateSchema', () => {
    it('should validate against schema', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      })

      const result1 = validateSchema({ name: 'John', age: 30 }, schema)
      expect(result1.valid).toBe(true)

      const result2 = validateSchema({ name: 'John', age: 'invalid' }, schema)
      expect(result2.valid).toBe(false)
      expect(result2.errors).toBeDefined()
    })

    it('should handle validation errors gracefully', () => {
      const schema = z.object({
        email: z.string().email(),
      })

      const result = validateSchema({ email: 'not-an-email' }, schema)
      expect(result.valid).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors?.length).toBeGreaterThan(0)
    })
  })
})
