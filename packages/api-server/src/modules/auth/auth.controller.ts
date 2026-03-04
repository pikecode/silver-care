import type { Request, Response } from 'express'
import type { ApiResponse } from '../../types/api'
import type { MeData, WechatLoginData } from './auth.schema'
import { parseWechatLoginInput } from './auth.schema'
import { createWechatLoginData } from './auth.service'

export function wechatLoginController(req: Request, res: Response<ApiResponse<WechatLoginData>>): void {
  const parsed = parseWechatLoginInput(req.body)

  if (!parsed.success) {
    res.status(400).json({ success: false, error: parsed.error })
    return
  }

  try {
    const data = createWechatLoginData(parsed.data)
    res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('[auth.wechatLogin] Error:', {
      error: error instanceof Error ? error.message : String(error),
      input: { code: parsed.data?.code ? '[REDACTED]' : undefined },
    })
    res.status(500).json({ success: false, error: 'internal server error' })
  }
}

export function meController(req: Request, res: Response<ApiResponse<MeData>>): void {
  if (!req.authUser) {
    res.status(401).json({ success: false, error: 'unauthorized' })
    return
  }

  res.status(200).json({ success: true, data: { user: req.authUser } })
}
