// 用户角色
export const USER_ROLES = {
  PARENT: 'parent',
  CHILD: 'child',
  ADMIN: 'admin',
} as const

// 健康数据类型
export const HEALTH_RECORD_TYPES = {
  MEDICATION: 'medication',
  BLOOD_PRESSURE: 'bloodPressure',
  BLOOD_SUGAR: 'bloodSugar',
} as const

// 提醒频率
export const REMINDER_FREQUENCY = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const

// 适老化设计常量
export const ELDERLY_UI = {
  MIN_FONT_SIZE: 18,
  KEY_FONT_SIZE: 24,
  MIN_BUTTON_SIZE: 48,
  BUTTON_SPACING: 12,
} as const
