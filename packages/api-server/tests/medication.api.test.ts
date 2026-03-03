import request from 'supertest'
import { createServer } from '../src/server'

describe('POST /api/v1/medications/:id/checkins', () => {
  it('creates checkin response', async () => {
    const app = createServer()
    const res = await request(app)
      .post('/api/v1/medications/med-1/checkins')
      .set('Authorization', 'Bearer test')
      .send({})

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data._id).toBeDefined()
  })
})
