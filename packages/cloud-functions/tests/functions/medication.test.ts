import {
  createMedication,
  getMedications,
  checkInMedication,
  getMedicationCheckins,
  updateMedication,
  deleteMedication,
} from '../../src/functions/medication'

describe('Medication Functions', () => {
  describe('createMedication', () => {
    it('should create medication', async () => {
      const result = await createMedication({
        userId: 'user-1',
        name: '阿司匹林',
        dosage: '100mg',
        frequency: 'daily',
        times: ['08:00', '20:00'],
      })

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.name).toBe('阿司匹林')
      expect(result.data?.active).toBe(true)
    })

    it('should create medication with correct dosage', async () => {
      const result = await createMedication({
        userId: 'user-1',
        name: '阿司匹林',
        dosage: '100mg',
        frequency: 'daily',
        times: ['08:00', '20:00'],
      })

      expect(result.data?.dosage).toBe('100mg')
    })

    it('should create medication with correct frequency', async () => {
      const result = await createMedication({
        userId: 'user-1',
        name: '阿司匹林',
        dosage: '100mg',
        frequency: 'daily',
        times: ['08:00', '20:00'],
      })

      expect(result.data?.frequency).toBe('daily')
    })

    it('should create medication with correct times', async () => {
      const result = await createMedication({
        userId: 'user-1',
        name: '阿司匹林',
        dosage: '100mg',
        frequency: 'daily',
        times: ['08:00', '20:00'],
      })

      expect(result.data?.times).toEqual(['08:00', '20:00'])
    })
  })

  describe('getMedications', () => {
    it('should get medications for user', async () => {
      const result = await getMedications('user-1')

      expect(result.success).toBe(true)
      expect(Array.isArray(result.data)).toBe(true)
    })

    it('should return empty array for user with no medications', async () => {
      const result = await getMedications('user-1')

      expect(result.data).toEqual([])
    })
  })

  describe('checkInMedication', () => {
    it('should record medication checkin', async () => {
      const result = await checkInMedication('med-1', 'user-1')

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?._id).toBeDefined()
      expect(result.data?.timestamp).toBeDefined()
    })

    it('should record checkin with correct userId', async () => {
      const result = await checkInMedication('med-1', 'user-1')

      expect(result.data?.userId).toBe('user-1')
    })

    it('should record checkin with correct medicationId', async () => {
      const result = await checkInMedication('med-1', 'user-1')

      expect(result.data?.medicationId).toBe('med-1')
    })
  })

  describe('getMedicationCheckins', () => {
    it('should get checkins for date', async () => {
      const result = await getMedicationCheckins('user-1', '2026-03-03')

      expect(result.success).toBe(true)
      expect(Array.isArray(result.data)).toBe(true)
    })

    it('should return empty array for date with no checkins', async () => {
      const result = await getMedicationCheckins('user-1', '2026-03-03')

      expect(result.data).toEqual([])
    })
  })

  describe('updateMedication', () => {
    it('should update medication', async () => {
      const result = await updateMedication('med-1', {
        name: '新药名',
      })

      expect(result.success).toBe(true)
      expect(result.data?.name).toBe('新药名')
    })

    it('should update medication with correct id', async () => {
      const result = await updateMedication('med-1', {
        name: '新药名',
      })

      expect(result.data?._id).toBe('med-1')
    })

    it('should preserve other fields when updating', async () => {
      const result = await updateMedication('med-1', {
        name: '新药名',
      })

      expect(result.data?.frequency).toBeDefined()
      expect(result.data?.dosage).toBeDefined()
    })
  })

  describe('deleteMedication', () => {
    it('should delete medication', async () => {
      const result = await deleteMedication('med-1')

      expect(result.success).toBe(true)
      expect(result.data?.success).toBe(true)
    })

    it('should return success status', async () => {
      const result = await deleteMedication('med-1')

      expect(result.data).toBeDefined()
      expect(result.data?.success).toBe(true)
    })
  })
})
