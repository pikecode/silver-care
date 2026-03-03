# 共享库（shared）— 模块上下文

> 跨模块共享的类型定义、工具函数、常量 | 核心功能：类型系统、验证工具、格式化工具、常量定义

**面包屑**：[🏠 根目录](../CLAUDE.md) > 共享库

---

## 📍 模块定位

共享库是家邻康的**类型和工具中枢**，为所有其他模块提供统一的类型定义、验证规则、格式化工具等。确保整个项目的类型安全和代码一致性。

### 核心职责

- 统一的 TypeScript 类型定义
- 数据验证 Schema（Zod）
- 格式化工具（日期、数字、电话等）
- 常量定义（角色、状态、错误码等）
- 工具函数（数组、对象、字符串操作）

---

## 🏗️ 项目结构

```
packages/shared/
├── src/
│   ├── types/                   # 类型定义
│   │   ├── user.ts             # 用户相关类型
│   │   ├── health.ts           # 健康数据类型
│   │   ├── activity.ts         # 活动相关类型
│   │   ├── service.ts          # 服务相关类型
│   │   ├── subscription.ts     # 订阅相关类型
│   │   ├── notification.ts     # 通知相关类型
│   │   ├── common.ts           # 通用类型
│   │   └── index.ts            # 导出所有类型
│   ├── schemas/                 # Zod 验证 Schema
│   │   ├── user.ts             # 用户验证
│   │   ├── health.ts           # 健康数据验证
│   │   ├── activity.ts         # 活动验证
│   │   ├── service.ts          # 服务验证
│   │   └── index.ts            # 导出所有 Schema
│   ├── constants/               # 常量定义
│   │   ├── roles.ts            # 用户角色
│   │   ├── status.ts           # 各种状态
│   │   ├── errors.ts           # 错误码
│   │   ├── messages.ts         # 错误消息
│   │   └── index.ts            # 导出所有常量
│   ├── utils/                   # 工具函数
│   │   ├── format.ts           # 格式化工具
│   │   ├── date.ts             # 日期工具
│   │   ├── array.ts            # 数组工具
│   │   ├── object.ts           # 对象工具
│   │   ├── string.ts           # 字符串工具
│   │   ├── number.ts           # 数字工具
│   │   ├── validation.ts       # 验证工具
│   │   └── index.ts            # 导出所有工具
│   ├── errors/                  # 自定义错误类
│   │   ├── AppError.ts         # 应用错误基类
│   │   ├── ValidationError.ts  # 验证错误
│   │   ├── AuthError.ts        # 认证错误
│   │   ├── NotFoundError.ts    # 未找到错误
│   │   └── index.ts            # 导出所有错误
│   └── index.ts                # 主导出文件
├── tests/                       # 测试文件
│   ├── unit/
│   └── integration/
├── package.json
└── README.md
```

---

## 📝 类型定义

### 用户相关类型

```typescript
// types/user.ts

export type UserRole = 'parent' | 'child' | 'admin'

export interface User {
  _id: string
  openId: string
  unionId?: string
  nickname: string
  avatar?: string
  phone?: string
  role: UserRole
  familyId?: string
  createdAt: number
  updatedAt: number
  lastLoginAt?: number
}

export interface FamilyMember {
  userId: string
  role: 'parent' | 'child'
  joinedAt: number
}

export interface Family {
  _id: string
  name: string
  createdBy: string
  members: FamilyMember[]
  createdAt: number
  updatedAt: number
}

export interface UserProfile {
  userId: string
  name: string
  age: number
  phone: string
  avatar?: string
  idCard?: string
  address?: string
  emergencyContact?: string
  diseases?: string[]
}
```

### 健康数据类型

```typescript
// types/health.ts

export type HealthRecordType = 'blood_pressure' | 'blood_sugar' | 'checkin'

export interface BloodPressure {
  systolic: number  // 收缩压
  diastolic: number // 舒张压
}

export interface HealthRecord {
  _id: string
  userId: string
  type: HealthRecordType
  value: number | BloodPressure
  timestamp: number
  notes?: string
  createdAt: number
}

export interface Medication {
  _id: string
  userId: string
  name: string
  dosage: string
  frequency: 'daily' | 'weekly' | 'custom'
  times: string[]
  notes?: string
  active: boolean
  createdAt: number
  updatedAt: number
}

export interface MedicationCheckin {
  _id: string
  userId: string
  medicationId: string
  timestamp: number
  createdAt: number
}

export interface HealthTrend {
  data: { date: string; value: number }[]
  average: number
  trend: 'up' | 'down' | 'stable'
  abnormalDays: string[]
}

export interface DailyReport {
  date: string
  userId: string
  summary: {
    medicationCheckinRate: number
    bloodPressure?: BloodPressure
    bloodSugar?: number
    mood?: 'good' | 'normal' | 'bad'
    notes?: string
  }
  alerts: Alert[]
}

export interface Alert {
  _id: string
  userId: string
  type: 'missed_checkin' | 'high_blood_pressure' | 'low_blood_sugar' | 'consecutive_anomalies'
  severity: 'low' | 'medium' | 'high'
  message: string
  read: boolean
  createdAt: number
}
```

### 活动相关类型

```typescript
// types/activity.ts

export type ActivityCategory = 'health' | 'social' | 'education' | 'entertainment'
export type ActivityStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'

export interface Activity {
  _id: string
  stationId: string
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  category: ActivityCategory
  image?: string
  status: ActivityStatus
  createdBy: string
  createdAt: number
  updatedAt: number
}

export interface ActivityRegistration {
  _id: string
  activityId: string
  userId: string
  registeredAt: number
  checkedIn: boolean
  checkinAt?: number
}

export interface ActivityStats {
  totalRegistrations: number
  checkins: number
  participationRate: number
}
```

### 服务相关类型

```typescript
// types/service.ts

export type ServiceOrderStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'

export interface Service {
  _id: string
  name: string
  description: string
  category: string
  price: number
  duration: number // 分钟
  image?: string
}

export interface ServiceOrder {
  _id: string
  parentId: string
  childId: string
  serviceId: string
  preferredDate: string
  preferredTime: string
  notes?: string
  status: ServiceOrderStatus
  providerId?: string
  review?: ServiceReview
  createdAt: number
  updatedAt: number
}

export interface ServiceReview {
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  createdAt: number
}

export interface ServiceProvider {
  _id: string
  name: string
  phone: string
  serviceTypes: string[]
  qualifications?: string[]
  rating: number
  reviewCount: number
  active: boolean
  createdAt: number
}
```

### 订阅相关类型

```typescript
// types/subscription.ts

export type SubscriptionPlan = 'free' | 'care' | 'premium'

export interface Subscription {
  _id: string
  userId: string
  plan: SubscriptionPlan
  startDate: number
  endDate?: number
  autoRenew: boolean
  paymentMethod?: string
  createdAt: number
  updatedAt: number
}

export interface SubscriptionPlanInfo {
  id: SubscriptionPlan
  name: string
  price: number
  period: 'month' | 'year'
  features: string[]
}
```

### 通知相关类型

```typescript
// types/notification.ts

export type NotificationType = 'medication_reminder' | 'daily_report' | 'alert' | 'order_update' | 'activity_reminder'

export interface Notification {
  _id: string
  userId: string
  type: NotificationType
  title: string
  content: string
  data?: Record<string, any>
  read: boolean
  createdAt: number
}
```

---

## 🔍 验证 Schema

### 用户验证

```typescript
// schemas/user.ts

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
```

### 健康数据验证

```typescript
// schemas/health.ts

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
```

---

## 🔧 工具函数

### 格式化工具

```typescript
// utils/format.ts

// 格式化日期
export function formatDate(timestamp: number, format: string = 'YYYY-MM-DD'): string
export function formatTime(timestamp: number, format: string = 'HH:mm'): string
export function formatDateTime(timestamp: number, format: string = 'YYYY-MM-DD HH:mm'): string

// 格式化数字
export function formatNumber(value: number, decimals: number = 2): string
export function formatCurrency(value: number, currency: string = '¥'): string
export function formatPercentage(value: number, decimals: number = 0): string

// 格式化电话
export function formatPhone(phone: string): string
export function maskPhone(phone: string): string

// 格式化血压
export function formatBloodPressure(bp: BloodPressure): string
export function formatBloodSugar(value: number): string
```

### 日期工具

```typescript
// utils/date.ts

export function isToday(timestamp: number): boolean
export function isYesterday(timestamp: number): boolean
export function isSameDay(timestamp1: number, timestamp2: number): boolean
export function getDayOfWeek(timestamp: number): string
export function getWeekRange(timestamp: number): { start: number; end: number }
export function getMonthRange(timestamp: number): { start: number; end: number }
export function addDays(timestamp: number, days: number): number
export function addMonths(timestamp: number, months: number): number
```

### 数组工具

```typescript
// utils/array.ts

export function chunk<T>(array: T[], size: number): T[][]
export function unique<T>(array: T[], key?: (item: T) => any): T[]
export function groupBy<T>(array: T[], key: (item: T) => string): Record<string, T[]>
export function sortBy<T>(array: T[], key: (item: T) => any, order?: 'asc' | 'desc'): T[]
export function flatten<T>(array: T[][]): T[]
export function compact<T>(array: (T | null | undefined)[]): T[]
```

### 对象工具

```typescript
// utils/object.ts

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
export function merge<T>(target: T, source: Partial<T>): T
export function deepClone<T>(obj: T): T
export function isEmpty(obj: any): boolean
```

### 字符串工具

```typescript
// utils/string.ts

export function capitalize(str: string): string
export function camelCase(str: string): string
export function snakeCase(str: string): string
export function kebabCase(str: string): string
export function truncate(str: string, length: number, suffix?: string): string
export function padStart(str: string, length: number, fill?: string): string
export function padEnd(str: string, length: number, fill?: string): string
```

### 验证工具

```typescript
// utils/validation.ts

export function isEmail(email: string): boolean
export function isPhone(phone: string): boolean
export function isIdCard(idCard: string): boolean
export function isUrl(url: string): boolean
export function isStrongPassword(password: string): boolean
export function validateSchema<T>(data: any, schema: z.ZodSchema<T>): { valid: boolean; errors?: string[] }
```

---

## 📦 常量定义

### 角色常量

```typescript
// constants/roles.ts

export const USER_ROLES = {
  PARENT: 'parent',
  CHILD: 'child',
  ADMIN: 'admin',
} as const

export const ROLE_LABELS = {
  parent: '老人',
  child: '子女',
  admin: '管理员',
} as const
```

### 状态常量

```typescript
// constants/status.ts

export const ACTIVITY_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const SERVICE_ORDER_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  CARE: 'care',
  PREMIUM: 'premium',
} as const
```

### 错误码常量

```typescript
// constants/errors.ts

export const ERROR_CODES = {
  // 认证错误
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',

  // 验证错误
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',

  // 资源错误
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',

  // 服务错误
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const
```

---

## 🧪 测试策略

### 单元测试

- 格式化函数
- 日期工具
- 数组/对象工具
- 验证函数
- 目标覆盖率：≥ 90%

### 集成测试

- Schema 验证
- 工具函数组合使用

---

## 🚀 开发入口

### 本地开发

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建
pnpm build
```

### 使用示例

```typescript
// 在其他模块中使用
import {
  User,
  HealthRecord,
  formatDate,
  formatBloodPressure,
  UserProfileSchema,
  validateSchema,
} from '@silver-care/shared'

// 使用类型
const user: User = { ... }

// 使用工具函数
const formatted = formatDate(Date.now())

// 使用验证
const result = validateSchema(data, UserProfileSchema)
```

---

## 📊 导出清单

### 类型导出

```typescript
// src/index.ts

export * from './types'
export * from './schemas'
export * from './constants'
export * from './utils'
export * from './errors'
```

---

**最后更新**：2026-03-03 | **维护者**：AI Context System
