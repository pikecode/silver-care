import crypto from 'crypto'
import type { AuthUser, WechatLoginData, WechatLoginInput } from './auth.schema'

const TOKEN_VERSION = 'v1'
const DEFAULT_TOKEN_TTL_SECONDS = 60 * 60

interface AuthTokenPayload {
  uid: string
  oid: string
  nn: string
  exp: number
}

function getTokenSecret(): string {
  const secret = process.env.AUTH_TOKEN_SECRET?.trim()

  if (!secret) {
    throw new Error('AUTH_TOKEN_SECRET is required')
  }

  return secret
}

function getTokenTtlSeconds(): number {
  const raw = process.env.AUTH_TOKEN_TTL_SECONDS

  if (!raw) {
    return DEFAULT_TOKEN_TTL_SECONDS
  }

  const parsed = Number(raw)

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return DEFAULT_TOKEN_TTL_SECONDS
  }

  return parsed
}

function toBase64Url(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url')
}

function fromBase64Url(value: string): string | null {
  try {
    return Buffer.from(value, 'base64url').toString('utf8')
  } catch {
    return null
  }
}

function signPayload(payloadBase64Url: string): string {
  return crypto.createHmac('sha256', getTokenSecret()).update(payloadBase64Url).digest('base64url')
}

function createAuthUser(id: string, openId: string, nickname: string): AuthUser {
  return {
    id,
    openId,
    nickname
  }
}

function createUserFromCode(code: string, nickname?: string): AuthUser {
  const normalizedCode = code.trim()

  return createAuthUser(`user-${normalizedCode}`, `openid-${normalizedCode}`, nickname ?? `用户-${normalizedCode}`)
}

function createTokenPayload(user: AuthUser): AuthTokenPayload {
  const nowInSeconds = Math.floor(Date.now() / 1000)

  return {
    uid: user.id,
    oid: user.openId,
    nn: user.nickname,
    exp: nowInSeconds + getTokenTtlSeconds()
  }
}

function encodeToken(payload: AuthTokenPayload): string {
  const payloadBase64Url = toBase64Url(JSON.stringify(payload))
  const signature = signPayload(payloadBase64Url)

  return `${TOKEN_VERSION}.${payloadBase64Url}.${signature}`
}

function decodeToken(token: string): AuthTokenPayload | null {
  const parts = token.split('.')

  if (parts.length !== 3) {
    return null
  }

  const [version, payloadBase64Url, signature] = parts

  if (!version || !payloadBase64Url || !signature) {
    return null
  }

  if (version !== TOKEN_VERSION) {
    return null
  }

  const expectedSignature = signPayload(payloadBase64Url)

  if (signature.length !== expectedSignature.length) {
    return null
  }

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null
  }

  const payloadJson = fromBase64Url(payloadBase64Url)

  if (!payloadJson) {
    return null
  }

  let payload: Partial<AuthTokenPayload>

  try {
    payload = JSON.parse(payloadJson) as Partial<AuthTokenPayload>
  } catch {
    return null
  }

  if (
    typeof payload.uid !== 'string' ||
    typeof payload.oid !== 'string' ||
    typeof payload.nn !== 'string' ||
    typeof payload.exp !== 'number'
  ) {
    return null
  }

  const nowInSeconds = Math.floor(Date.now() / 1000)

  if (payload.exp <= nowInSeconds) {
    return null
  }

  return {
    uid: payload.uid,
    oid: payload.oid,
    nn: payload.nn,
    exp: payload.exp
  }
}

export function createWechatLoginData(input: WechatLoginInput): WechatLoginData {
  const code = input.code.trim()
  const nickname = input.nickname?.trim()
  const user = createUserFromCode(code, nickname)

  return {
    token: encodeToken(createTokenPayload(user)),
    user
  }
}

export function getAuthUserByToken(token: string): AuthUser | null {
  const payload = decodeToken(token)

  if (!payload) {
    return null
  }

  return createAuthUser(payload.uid, payload.oid, payload.nn)
}
