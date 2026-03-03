import request from 'supertest'
import { createServer } from '../src/server'

describe('POST /api/v1/auth/wechat-login', () => {
  it('returns deterministic token and user for valid input', async () => {
    const app = createServer()

    const res = await request(app).post('/api/v1/auth/wechat-login').send({
      code: 'WX123',
      nickname: '王阿姨'
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      success: true,
      data: {
        token: 'mock-token-WX123',
        user: {
          id: 'user-WX123',
          openId: 'openid-WX123',
          nickname: '王阿姨'
        }
      }
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
