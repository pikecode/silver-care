import request from 'supertest'
import { createServer } from '../src/server'

describe('POST /api/v1/health-records', () => {
  it('creates health record', async () => {
    const app = createServer()
    const res = await request(app)
      .post('/api/v1/health-records')
      .set('Authorization', 'Bearer test')
      .send({ type: 'blood_pressure', value: { systolic: 120, diastolic: 80 } })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data._id).toBeDefined()
  })
})
