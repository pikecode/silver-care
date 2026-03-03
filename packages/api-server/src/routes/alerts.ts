import express, { Router } from 'express'

const router = Router()

router.post('/', (_req, res) => {
  res.status(200).json({ success: true, data: { _id: 'alert-1', type: _req.body.type || 'info', severity: _req.body.severity || 'low', message: _req.body.message || '', timestamp: Date.now() } })
})

router.post('/list', (_req, res) => {
  res.status(200).json({ success: true, data: [] })
})

router.post('/:id/read', (_req, res) => {
  res.status(200).json({ success: true, data: { _id: _req.params.id, type: 'info', severity: 'low', message: '', timestamp: Date.now(), read: true } })
})

router.post('/:id/delete', (_req, res) => {
  res.status(200).json({ success: true })
})

export default router
