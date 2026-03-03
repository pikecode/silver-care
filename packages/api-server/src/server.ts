import express, { Express } from 'express'
import authRouter from './routes/auth'
import healthRouter from './routes/health'
import medicationRouter from './routes/medication'
import healthRecordsRouter from './routes/health-records'

export function createServer(): Express {
  const app = express()

  app.use(express.json())
  app.use('/api/v1', healthRouter)
  app.use('/api/v1', authRouter)
  app.use('/api/v1/medications', medicationRouter)
  app.use('/api/v1/health-records', healthRecordsRouter)

  return app
}
