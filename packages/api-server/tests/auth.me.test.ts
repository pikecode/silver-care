import request from 'supertest'
import { createServer } from '../src/server'

describe('GET /api/v1/auth/me', () => {
  it('returns current user when bearer token is valid', async () => {
    const app = createServer()

    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer mock-token-WX123')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      success: true,
      data: {
        user: {
          id: 'user-WX123',
          openId: 'openid-WX123',
          nickname: '用户-WX123'
        }
      }
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
