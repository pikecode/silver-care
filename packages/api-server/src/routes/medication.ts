import express, { Router } from 'express'

const router = Router()

router.post('/:id/checkins', (_req, res) => {
  res.status(200).json({ success: true, data: { _id: 'checkin-1', medicationId: _req.params.id, timestamp: Date.now() } })
})

router.post('/list', (_req, res) => {
  res.status(200).json({ success: true, data: [] })
})

router.post('/', (_req, res) => {
  res.status(200).json({ success: true, data: { _id: 'med-1', name: 'Test', dosage: '100mg', frequency: 'daily', times: ['08:00'], createdAt: Date.now(), updatedAt: Date.now() } })
})

export default router
