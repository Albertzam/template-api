import { RpcException } from '@nestjs/microservices'
import { TimeoutError } from 'rxjs'
import { MicroserviceErrorCodes } from './constants'
import { MicroserviceError } from './microserviceError'

export const convertErrorMicroservice = (
  error: Error | MicroserviceError
): MicroserviceError => {
  if (!(error instanceof MicroserviceError)) {
    return new MicroserviceError(
      error.message,
      MicroserviceErrorCodes.UNKNOWN,
      undefined,
      undefined,
      error
    )
  }
  return error
}

export const coerceMicroserviceErrorFromRpc = (
  error: RpcException
): MicroserviceError => {
  try {
    const parsedMessage = JSON.parse(error.message)
    console.log(
      parsedMessage.message,
      parsedMessage.code,
      parsedMessage.fields,
      parsedMessage.metadata,
      {
        message: error.message,
        name: error.name,
        stack: parsedMessage.stack,
      }
    )
    return new MicroserviceError(
      parsedMessage.message,
      parsedMessage.code,
      parsedMessage.fields,
      parsedMessage.metadata,
      {
        message: error.message,
        name: error.name,
        stack: parsedMessage.stack,
      }
    )
  } catch (err) {
    return new MicroserviceError(
      error.message,
      error instanceof TimeoutError
        ? MicroserviceErrorCodes.REQUEST_TIMEOUT
        : MicroserviceErrorCodes.UNKNOWN_DESERIALIZATION, //microservice is not response nothing
      undefined,
      undefined,
      {
        message: error.message,
        name: error.name,
        stack: error.stack,
      }
    )
  }
}
