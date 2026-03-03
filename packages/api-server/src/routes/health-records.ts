import express, { Router } from 'express'

const router = Router()

router.post('/', (_req, res) => {
  res.status(200).json({ success: true, data: { _id: 'record-1', type: 'blood_pressure', value: { systolic: 120, diastolic: 80 }, timestamp: Date.now() } })
})

router.post('/list', (_req, res) => {
  res.status(200).json({ success: true, data: [] })
})

router.post('/trend', (_req, res) => {
  res.status(200).json({ success: true, data: { type: 'blood_pressure', average: 120, trend: 'stable', data: [] } })
})

router.post('/anomalies', (_req, res) => {
  res.status(200).json({ success: true, data: [] })
})

export default router
