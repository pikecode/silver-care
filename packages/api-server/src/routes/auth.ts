import { Router } from 'express'
import { meController, wechatLoginController } from '../modules/auth/auth.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/auth/wechat-login', wechatLoginController)
router.get('/auth/me', requireAuth, meController)

export default router
