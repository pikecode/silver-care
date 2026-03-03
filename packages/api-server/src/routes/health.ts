import { Router, Request, Response } from 'express'
import { ApiResponse, HealthStatus } from '../types/api'

const router = Router()

router.get('/health', (_req: Request, res: Response<ApiResponse<HealthStatus>>) => {
  res.status(200).json({ success: true, data: { status: 'ok' } })
})

export default router
