import express, { Router } from 'express'

const router = Router()

router.post('/daily/generate', (_req, res) => {
  res.status(200).json({ success: true, data: { _id: 'report-1', date: _req.body.date || '2026-03-03', userId: 'u1', summary: { medicationCheckinRate: 100 }, alerts: [] } })
})

router.post('/daily/list', (_req, res) => {
  res.status(200).json({ success: true, data: [{ _id: 'report-1', date: '2026-03-03', userId: 'u1', summary: { medicationCheckinRate: 100 }, alerts: [] }] })
})

router.post('/daily/latest', (_req, res) => {
  res.status(200).json({ success: true, data: { _id: 'report-1', date: '2026-03-03', userId: 'u1', summary: { medicationCheckinRate: 100 }, alerts: [] } })
})

export default router
