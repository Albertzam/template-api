import { Logger } from '@nestjs/common'
import * as winston from 'winston'
import { logLevel } from './logLevel'
const _logger = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
})

_logger.log = (...args: any) => {
  const { level, msg, ctx } = contextMixin(...args)

  const message = `${msg} - \n${JSON.stringify(ctx, null, 2)}`
  const { data } = ctx

  switch (level) {
    case 'debug': {
      Logger.debug(message, data)
      break
    }
    case 'warn': {
      Logger.warn(message, data)
      break
    }
    case 'error': {
      Logger.warn(message, data)
      break
    }
    default: {
      Logger.log(message, undefined)
    }
  }
  return _logger
}

interface ContextMetadata {
  [key: string]: string
}
export const contextMixin = (
  ...args: any
): {
  level: string
  msg: string
  ctx: any
} => {
  let ctx: ContextMetadata = {}

  const level = args[0]
  const msg = args[1]
  const meta = args[2]
  const { http, error } = meta
  if (http) {
    ctx.http = http
    meta.http = undefined
  }
  if (error) {
    ctx.error = error
    meta.error = undefined
  }
  ctx.data = meta

  return { level, msg, ctx }
}

export const logger = _logger
