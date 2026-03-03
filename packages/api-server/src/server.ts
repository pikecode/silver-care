import express, { Express } from 'express'
import authRouter from './routes/auth'
import healthRouter from './routes/health'

export function createServer(): Express {
  const app = express()

  app.use(express.json())
  app.use('/api/v1', healthRouter)
  app.use('/api/v1', authRouter)

  return app
}
