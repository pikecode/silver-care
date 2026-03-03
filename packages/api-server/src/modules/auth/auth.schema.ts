export interface AuthUser {
  id: string
  openId: string
  nickname: string
}

export interface WechatLoginInput {
  code: string
  nickname?: string
}

export interface WechatLoginData {
  token: string
  user: AuthUser
}

export interface MeData {
  user: AuthUser
}

export function parseWechatLoginInput(input: unknown): { success: true; data: WechatLoginInput } | { success: false; error: string } {
  if (typeof input !== 'object' || input === null) {
    return { success: false, error: 'code is required' }
  }

  const payload = input as { code?: unknown; nickname?: unknown }

  if (typeof payload.code !== 'string' || payload.code.trim().length === 0) {
    return { success: false, error: 'code is required' }
  }

  if (payload.nickname !== undefined && typeof payload.nickname !== 'string') {
    return { success: false, error: 'nickname must be a string' }
  }

  const normalizedNickname = payload.nickname?.trim()

  return {
    success: true,
    data: {
      code: payload.code.trim(),
      ...(normalizedNickname ? { nickname: normalizedNickname } : {})
    }
  }
}
