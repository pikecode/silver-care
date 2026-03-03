import type { NextFunction, Request, Response } from 'express'
import type { ApiResponse } from '../types/api'
import type { AuthUser } from '../modules/auth/auth.schema'
import { getAuthUserByToken } from '../modules/auth/auth.service'

declare global {
  namespace Express {
    interface Request {
      authUser?: AuthUser
    }
  }
}

function parseBearerToken(authorizationHeader: string | undefined): string | null {
  if (!authorizationHeader) {
    return null
  }

  const [scheme, token] = authorizationHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return null
  }

  return token
}

export function requireAuth(req: Request, res: Response<ApiResponse>, next: NextFunction): void {
  const token = parseBearerToken(req.header('authorization'))

  if (!token) {
    res.status(401).json({ success: false, error: 'unauthorized' })
    return
  }

  try {
    const authUser = getAuthUserByToken(token)

    if (!authUser) {
      res.status(401).json({ success: false, error: 'unauthorized' })
      return
    }

    req.authUser = authUser
    next()
  } catch {
    res.status(401).json({ success: false, error: 'unauthorized' })
  }
}
