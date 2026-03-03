import type { Medication } from '../../../shared/src/types/health'
import type { Queryable } from './user-repository'

export interface MedicationRow {
  id: string
  user_id: string
  name: string
  dosage: string
  frequency: Medication['frequency']
  times: string[]
  notes: string | null
  active: boolean
  created_at: number
  updated_at: number
}

export function mapMedicationRow(row: MedicationRow): Medication {
  return {
    _id: row.id,
    userId: row.user_id,
    name: row.name,
    dosage: row.dosage,
    frequency: row.frequency,
    times: [...row.times],
    ...(row.notes ? { notes: row.notes } : {}),
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

export class MedicationRepository {
  constructor(private readonly db: Queryable) {}

  async findByUserId(userId: string): Promise<Medication[]> {
    const { rows } = await this.db.query<MedicationRow>(
      'SELECT * FROM medications WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )

    return rows.map((row) => mapMedicationRow(row))
  }
}
