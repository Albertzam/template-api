import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { logger } from 'src/middleware'
import {
  coerceMicroserviceErrorFromRpc,
  convertErrorMicroservice,
} from './convertError'
import { ErrorService } from './error.service'
import { MicroserviceError } from './microserviceError'

@Catch()
export class DeserializerExceptionFilter implements ExceptionFilter {
  constructor(private readonly errorService: ErrorService) {}
  catch(
    error: Error | MicroserviceError | RpcException | HttpException,
    host: ArgumentsHost
  ): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    if (error instanceof HttpException) {
      const status = error.getStatus()
      logger.error(`${error.message}`, {
        http: { status_code: status },
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          status: error.getStatus(),
          response: error.getResponse(),
        },
      })
      response.status(status).json(error.getResponse())
    } else {
      const microserviceError = convertErrorMicroservice(
        coerceMicroserviceErrorFromRpc(error as RpcException)
      )
      const status = this.errorService.getHttpStatus(microserviceError.code)
      logger.error(`${error.message}`, {
        error: {
          code: microserviceError.code,
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
        remote_error: microserviceError.error
          ? {
              message: microserviceError.error.message,
              stack: microserviceError.error.stack,
              name: microserviceError.error.name,
            }
          : undefined,
        validation: microserviceError.fields,
      })
      response.status(status).json({
        code: microserviceError.code,
        message: microserviceError.message,
        fields: microserviceError.fields,
      })
    }
  }
}
