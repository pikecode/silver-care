import request from 'supertest'
import { createServer } from '../src/server'

describe('POST /api/v1/reports/daily/latest', () => {
  it('returns latest daily report', async () => {
    const app = createServer()
    const res = await request(app)
      .post('/api/v1/reports/daily/latest')
      .set('Authorization', 'Bearer test')
      .send({})

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.date).toBeDefined()
  })
})
