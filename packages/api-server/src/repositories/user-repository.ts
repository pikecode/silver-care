import type { User } from '../../../shared/src/types/user'

export interface UserRow {
  id: string
  open_id: string
  union_id: string | null
  nickname: string
  avatar: string | null
  phone: string | null
  role: User['role']
  family_id: string | null
  created_at: number
  updated_at: number
  last_login_at: number | null
}

export interface Queryable {
  query<T>(text: string, params?: unknown[]): Promise<{ rows: T[] }>
}

export function mapUserRow(row: UserRow): User {
  return {
    _id: row.id,
    openId: row.open_id,
    ...(row.union_id ? { unionId: row.union_id } : {}),
    nickname: row.nickname,
    ...(row.avatar ? { avatar: row.avatar } : {}),
    ...(row.phone ? { phone: row.phone } : {}),
    role: row.role,
    ...(row.family_id ? { familyId: row.family_id } : {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ...(row.last_login_at ? { lastLoginAt: row.last_login_at } : {})
  }
}

export class UserRepository {
  constructor(private readonly db: Queryable) {}

  async findByOpenId(openId: string): Promise<User | null> {
    const { rows } = await this.db.query<UserRow>(
      'SELECT * FROM users WHERE open_id = $1 LIMIT 1',
      [openId]
    )

    if (rows.length === 0) {
      return null
    }

    return mapUserRow(rows[0])
  }
}
