import { Logger, NestMiddleware } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { logger } from './logger'
import { Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(
    request: Request,
    response: Response,
    next: (error?: Error | any) => void
  ) {
    const { ip, method, baseUrl, query, body } = request
    const userAgent = request.get('user-agent') || ''

    logger.info('http request received', {
      network: {
        client: {
          ip: ip,
        },
      },
      http: {
        method,
        url: baseUrl,
        useragent: userAgent,
        query: JSON.stringify(query),
        body,
      },
    })
    response.on('close', () => {
      const { statusCode } = response
      logger.info('http request finished', {
        network: {
          client: {
            ip,
          },
        },
        http: {
          status_code: statusCode,
          url: baseUrl,
        },
      })
    })

    next()
  }
}
