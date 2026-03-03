import { z } from 'zod'

export const UserLoginSchema = z.object({
  code: z.string().min(1, '登录码不能为空'),
})

export const UserProfileSchema = z.object({
  name: z.string().min(1, '姓名不能为空').max(50),
  age: z.number().int().min(0).max(150),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '电话号码格式不正确'),
  address: z.string().optional(),
})

export const FamilyInviteSchema = z.object({
  inviteCode: z.string().min(1, '邀请码不能为空'),
})
