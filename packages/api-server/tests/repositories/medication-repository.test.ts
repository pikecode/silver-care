import {
  mapMedicationRow,
  type MedicationRow
} from '../../src/repositories/medication-repository'

describe('mapMedicationRow', () => {
  it('maps snake_case row fields to domain Medication fields', () => {
    const row: MedicationRow = {
      id: 'med_1',
      user_id: 'user_1',
      name: '阿司匹林',
      dosage: '100mg',
      frequency: 'daily',
      times: ['08:00', '20:00'],
      notes: '饭后服用',
      active: true,
      created_at: 1700000000000,
      updated_at: 1700000100000
    }

    expect(mapMedicationRow(row)).toEqual({
      _id: 'med_1',
      userId: 'user_1',
      name: '阿司匹林',
      dosage: '100mg',
      frequency: 'daily',
      times: ['08:00', '20:00'],
      notes: '饭后服用',
      active: true,
      createdAt: 1700000000000,
      updatedAt: 1700000100000
    })
  })

  it('omits optional notes when db value is null', () => {
    const row: MedicationRow = {
      id: 'med_2',
      user_id: 'user_2',
      name: '二甲双胍',
      dosage: '500mg',
      frequency: 'weekly',
      times: ['09:00'],
      notes: null,
      active: false,
      created_at: 1700000300000,
      updated_at: 1700000400000
    }

    expect(mapMedicationRow(row)).toEqual({
      _id: 'med_2',
      userId: 'user_2',
      name: '二甲双胍',
      dosage: '500mg',
      frequency: 'weekly',
      times: ['09:00'],
      active: false,
      createdAt: 1700000300000,
      updatedAt: 1700000400000
    })
  })
})
