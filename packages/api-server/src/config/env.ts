export interface EnvConfig {
  nodeEnv: string
  port: number
  dbHost: string
  dbPort: number
  dbUser: string
  dbPassword: string
  dbName: string
  dbSsl: boolean
  dbMaxConnections: number
  databaseUrl: string
}

function parseNumber(value: string | undefined, fallback: number): number {
  if (value === undefined) {
    return fallback
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) {
    return fallback
  }

  return value === 'true' || value === '1'
}

export function getEnv(env: NodeJS.ProcessEnv = process.env): EnvConfig {
  const nodeEnv = env.NODE_ENV ?? 'development'
  const port = parseNumber(env.PORT, 3000)

  const dbHost = env.DB_HOST ?? '127.0.0.1'
  const dbPort = parseNumber(env.DB_PORT, 5432)
  const dbUser = env.DB_USER ?? 'postgres'
  const dbPassword = env.DB_PASSWORD ?? 'postgres'
  const dbName = env.DB_NAME ?? 'silver_care'
  const dbSsl = parseBoolean(env.DB_SSL, false)
  const dbMaxConnections = parseNumber(env.DB_MAX_CONNECTIONS, 10)

  const databaseUrl =
    env.DATABASE_URL ??
    `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`

  return {
    nodeEnv,
    port,
    dbHost,
    dbPort,
    dbUser,
    dbPassword,
    dbName,
    dbSsl,
    dbMaxConnections,
    databaseUrl
  }
}
