export const ERROR_MESSAGES = {
  UNAUTHORIZED: '未授权',
  FORBIDDEN: '禁止访问',
  TOKEN_EXPIRED: '令牌已过期',
  VALIDATION_ERROR: '验证失败',
  INVALID_INPUT: '输入无效',
  NOT_FOUND: '未找到',
  ALREADY_EXISTS: '已存在',
  INTERNAL_ERROR: '内部错误',
  SERVICE_UNAVAILABLE: '服务不可用',
} as const

export const SUCCESS_MESSAGES = {
  CREATED: '创建成功',
  UPDATED: '更新成功',
  DELETED: '删除成功',
  SUBMITTED: '提交成功',
} as const
