import { z } from 'zod'
import { User, ApiResponse } from '@silver-care/shared'

const DEPRECATION_MESSAGE = 'This cloud function has been deprecated. Please use the REST API instead: POST /api/v1/auth/wechat-login'

// 微信登录
export async function wechatLogin(code: string): Promise<ApiResponse<{ token: string; user: User }>> {
  return {
    success: false,
    error: DEPRECATION_MESSAGE,
    code: 410,
  }
}

// 获取用户信息
export async function getUserInfo(userId: string): Promise<ApiResponse<User>> {
  return {
    success: false,
    error: DEPRECATION_MESSAGE,
    code: 410,
  }
}

