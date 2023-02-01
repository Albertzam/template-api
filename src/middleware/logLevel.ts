export enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

export const isLogLevel = (level: string): level is LogLevel => {
  return (Object.values(LogLevel) as string[]).includes(level)
}
const env = process.env.NODE_ENV || 'development'
//verify log level is exist in .env
export const logLevel =
  process.env.LOG_LEVEL && isLogLevel(process.env.LOG_LEVEL)
    ? process.env.LOG_LEVEL
    : env === 'production'
    ? 'info'
    : env === 'test'
    ? 'silly'
    : 'debug'
