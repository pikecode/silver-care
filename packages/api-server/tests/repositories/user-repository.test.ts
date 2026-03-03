import { mapUserRow, type UserRow } from '../../src/repositories/user-repository'

describe('mapUserRow', () => {
  it('maps snake_case row fields to domain User fields', () => {
    const row: UserRow = {
      id: 'user_1',
      open_id: 'openid_123',
      union_id: 'union_123',
      nickname: '张三',
      avatar: 'https://example.com/avatar.png',
      phone: '13800138000',
      role: 'parent',
      family_id: 'family_1',
      created_at: 1700000000000,
      updated_at: 1700000100000,
      last_login_at: 1700000200000
    }

    expect(mapUserRow(row)).toEqual({
      _id: 'user_1',
      openId: 'openid_123',
      unionId: 'union_123',
      nickname: '张三',
      avatar: 'https://example.com/avatar.png',
      phone: '13800138000',
      role: 'parent',
      familyId: 'family_1',
      createdAt: 1700000000000,
      updatedAt: 1700000100000,
      lastLoginAt: 1700000200000
    })
  })

  it('omits optional fields when db values are null', () => {
    const row: UserRow = {
      id: 'user_2',
      open_id: 'openid_456',
      union_id: null,
      nickname: '李四',
      avatar: null,
      phone: null,
      role: 'child',
      family_id: null,
      created_at: 1700000300000,
      updated_at: 1700000400000,
      last_login_at: null
    }

    expect(mapUserRow(row)).toEqual({
      _id: 'user_2',
      openId: 'openid_456',
      nickname: '李四',
      role: 'child',
      createdAt: 1700000300000,
      updatedAt: 1700000400000
    })
  })
})
