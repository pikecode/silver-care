import request from 'supertest'
import { createServer } from '../src/server'

describe('POST /api/v1/auth/wechat-login', () => {
  beforeEach(() => {
    process.env.AUTH_TOKEN_SECRET = 'test-auth-secret'
    process.env.AUTH_TOKEN_TTL_SECONDS = '3600'
  })

  it('returns signed token and user for valid input', async () => {
    const app = createServer()

    const res = await request(app).post('/api/v1/auth/wechat-login').send({
      code: 'WX123',
      nickname: '王阿姨'
    })

    expect(res.statusCode).toBe(200)
    expect(typeof res.body.data?.token).toBe('string')
    expect(res.body.data?.token.length).toBeGreaterThan(20)
    expect(res.body).toEqual({
      success: true,
      data: {
        token: res.body.data.token,
        user: {
          id: 'user-WX123',
          openId: 'openid-WX123',
          nickname: '王阿姨'
        }
      }
    })
  })

  it('returns internal server error when token secret is missing', async () => {
    const app = createServer()
    delete process.env.AUTH_TOKEN_SECRET

    const res = await request(app).post('/api/v1/auth/wechat-login').send({
      code: 'WX123',
      nickname: '王阿姨'
    })

    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual({
      success: false,
      error: 'internal server error'
    })
  })

  it('returns validation error when code is missing', async () => {
    const app = createServer()

    const res = await request(app).post('/api/v1/auth/wechat-login').send({
      nickname: '王阿姨'
    })

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({
      success: false,
      error: 'code is required'
    })
  })
})
