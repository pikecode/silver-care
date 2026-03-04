import type { Request, Response, NextFunction } from 'express'
import type { ApiResponse } from '../types/api'

export function notFoundHandler(req: Request, res: Response<ApiResponse<never>>): void {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.path}`,
  })
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response<ApiResponse<never>>,
  next: NextFunction
): void {
  console.error('[errorHandler] Unhandled error:', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    path: req.path,
  })

  res.status(500).json({
    success: false,
    error: 'Internal server error',
  })
}
