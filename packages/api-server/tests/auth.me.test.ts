import request from 'supertest'
import { createServer } from '../src/server'

describe('GET /api/v1/auth/me', () => {
  beforeEach(() => {
    process.env.AUTH_TOKEN_SECRET = 'test-auth-secret'
    process.env.AUTH_TOKEN_TTL_SECONDS = '3600'
  })

  it('returns user consistent with login result for same token', async () => {
    const app = createServer()

    const loginRes = await request(app).post('/api/v1/auth/wechat-login').send({
      code: 'WX123',
      nickname: '王阿姨'
    })

    expect(loginRes.statusCode).toBe(200)

    const token = loginRes.body.data?.token
    expect(typeof token).toBe('string')

    const meRes = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`)

    expect(meRes.statusCode).toBe(200)
    expect(meRes.body).toEqual({
      success: true,
      data: {
        user: loginRes.body.data.user
      }
    })
  })

  it('rejects forged token even if based on a valid token', async () => {
    const app = createServer()

    const loginRes = await request(app).post('/api/v1/auth/wechat-login').send({
      code: 'WX999',
      nickname: '李叔'
    })

    expect(loginRes.statusCode).toBe(200)

    const forgedToken = `${loginRes.body.data.token}tampered`

    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${forgedToken}`)

    expect(res.statusCode).toBe(401)
    expect(res.body).toEqual({
      success: false,
      error: 'unauthorized'
    })
  })

  it('returns unauthorized for malformed token with extra segments', async () => {
    const app = createServer()

    const loginRes = await request(app).post('/api/v1/auth/wechat-login').send({
      code: 'WX777',
      nickname: '赵阿姨'
    })

    expect(loginRes.statusCode).toBe(200)

    const malformedToken = `${loginRes.body.data.token}.extra`

    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${malformedToken}`)

    expect(res.statusCode).toBe(401)
    expect(res.body).toEqual({
      success: false,
      error: 'unauthorized'
    })
  })

  it('returns unauthorized when token is missing', async () => {
    const app = createServer()

    const res = await request(app).get('/api/v1/auth/me')

    expect(res.statusCode).toBe(401)
    expect(res.body).toEqual({
      success: false,
      error: 'unauthorized'
    })
  })

  it('returns unauthorized when token is invalid', async () => {
    const app = createServer()

    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer invalid-token')

    expect(res.statusCode).toBe(401)
    expect(res.body).toEqual({
      success: false,
      error: 'unauthorized'
    })
  })
})
