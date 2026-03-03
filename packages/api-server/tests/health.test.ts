import request from 'supertest'
import { createServer } from '../src/server'

describe('GET /api/v1/health', () => {
  it('returns ok', async () => {
    const app = createServer()
    const res = await request(app).get('/api/v1/health')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ success: true, data: { status: 'ok' } })
  })
})
