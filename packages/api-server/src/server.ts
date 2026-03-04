import express, { Express } from 'express'
import authRouter from './routes/auth'
import healthRouter from './routes/health'
import medicationRouter from './routes/medication'
import healthRecordsRouter from './routes/health-records'
import reportsRouter from './routes/reports'
import alertsRouter from './routes/alerts'
import { notFoundHandler, errorHandler } from './middleware/error-handler'

export function createServer(): Express {
  const app = express()

  app.use(express.json())
  app.use('/api/v1', healthRouter)
  app.use('/api/v1', authRouter)
  app.use('/api/v1/medications', medicationRouter)
  app.use('/api/v1/health-records', healthRecordsRouter)
  app.use('/api/v1/reports', reportsRouter)
  app.use('/api/v1/alerts', alertsRouter)

  // 404 handler
  app.use(notFoundHandler)

  // Global error handler
  app.use(errorHandler)

  return app
}
