import { Pool } from 'pg'
import { getEnv } from '../config/env'

let pool: Pool | undefined

export function createDbPool(): Pool {
  const env = getEnv()

  return new Pool({
    connectionString: env.databaseUrl,
    max: env.dbMaxConnections,
    ssl: env.dbSsl ? { rejectUnauthorized: false } : undefined
  })
}

export function getDbPool(): Pool {
  if (!pool) {
    pool = createDbPool()
  }

  return pool
}
