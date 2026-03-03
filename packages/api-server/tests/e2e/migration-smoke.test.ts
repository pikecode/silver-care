import request from 'supertest'
import { createServer } from '../../src/server'

describe('migration smoke tests', () => {
  beforeAll(() => {
    process.env.AUTH_TOKEN_SECRET = 'test-secret-key-for-testing-only'
  })

  it('auth + medication + report happy path works without wx.cloud', async () => {
    const app = createServer()

    // Step 1: Login
    const loginRes = await request(app)
      .post('/api/v1/auth/wechat-login')
      .send({ code: 'mock-code' })

    expect(loginRes.status).toBe(200)
    expect(loginRes.body.success).toBe(true)
    expect(loginRes.body.data.token).toBeDefined()
    const token = loginRes.body.data.token

    // Step 2: Record medication checkin
    const checkinRes = await request(app)
      .post('/api/v1/medications/med-1/checkins')
      .set('Authorization', `Bearer ${token}`)
      .send({})

    expect(checkinRes.status).toBe(200)
    expect(checkinRes.body.success).toBe(true)
    expect(checkinRes.body.data._id).toBeDefined()

    // Step 3: Get latest daily report
    const reportRes = await request(app)
      .post('/api/v1/reports/daily/latest')
      .set('Authorization', `Bearer ${token}`)
      .send({})

    expect(reportRes.status).toBe(200)
    expect(reportRes.body.success).toBe(true)
    expect(reportRes.body.data.date).toBeDefined()
  })

  it('health record flow works', async () => {
    const app = createServer()

    const res = await request(app)
      .post('/api/v1/health-records')
      .send({ type: 'blood_pressure', value: { systolic: 120, diastolic: 80 } })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data._id).toBeDefined()
  })

  it('alert flow works', async () => {
    const app = createServer()

    const res = await request(app)
      .post('/api/v1/alerts/list')
      .send({})

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})
