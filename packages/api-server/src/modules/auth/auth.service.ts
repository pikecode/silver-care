import type { AuthUser, WechatLoginData, WechatLoginInput } from './auth.schema'

const TOKEN_PREFIX = 'mock-token-'

function createUserFromCode(code: string, nickname?: string): AuthUser {
  return {
    id: `user-${code}`,
    openId: `openid-${code}`,
    nickname: nickname ?? `用户-${code}`
  }
}

export function createWechatLoginData(input: WechatLoginInput): WechatLoginData {
  const code = input.code.trim()
  const nickname = input.nickname?.trim()

  return {
    token: `${TOKEN_PREFIX}${code}`,
    user: createUserFromCode(code, nickname)
  }
}

export function getAuthUserByToken(token: string): AuthUser | null {
  if (!token.startsWith(TOKEN_PREFIX)) {
    return null
  }

  const code = token.slice(TOKEN_PREFIX.length).trim()

  if (!code) {
    return null
  }

  return createUserFromCode(code)
}
