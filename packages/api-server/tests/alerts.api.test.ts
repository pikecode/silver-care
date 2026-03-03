import request from 'supertest'
import { createServer } from '../src/server'

describe('POST /api/v1/alerts/list', () => {
  it('returns alerts list', async () => {
    const app = createServer()
    const res = await request(app)
      .post('/api/v1/alerts/list')
      .set('Authorization', 'Bearer test')
      .send({})

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})
