import { z } from 'zod'

export const BloodPressureSchema = z.object({
  systolic: z.number().int().min(60).max(250),
  diastolic: z.number().int().min(40).max(150),
})

export const BloodSugarSchema = z.number().min(20).max(600)

export const MedicationSchema = z.object({
  name: z.string().min(1, '药物名称不能为空'),
  dosage: z.string().min(1, '用量不能为空'),
  frequency: z.enum(['daily', 'weekly', 'custom']),
  times: z.array(z.string().regex(/^\d{2}:\d{2}$/)),
  notes: z.string().optional(),
})

export const HealthRecordSchema = z.object({
  type: z.enum(['blood_pressure', 'blood_sugar']),
  value: z.union([BloodPressureSchema, BloodSugarSchema]),
  notes: z.string().optional(),
})
