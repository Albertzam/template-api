import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { MicroserviceErrorCodes } from './constants'

@Injectable()
export class ErrorService {
  private ERROR_CODE_MAPS = new Map<string, HttpStatus>([
    [MicroserviceErrorCodes.UNKNOWN, HttpStatus.INTERNAL_SERVER_ERROR],
    [
      MicroserviceErrorCodes.UNKNOWN_DESERIALIZATION,
      HttpStatus.INTERNAL_SERVER_ERROR,
    ],
    [MicroserviceErrorCodes.REQUEST_TIMEOUT, HttpStatus.REQUEST_TIMEOUT],
  ])

  registerErrorCodeMap(code: string, status: HttpStatus): void {
    if (this.ERROR_CODE_MAPS.has(code)) {
      throw new Error(`Error code ${code} already registered`)
    }
    Logger.debug(`register code ${code} status ${status}`)
    this.ERROR_CODE_MAPS.set(code, status)
  }

  getStatusFromErrorCode(code: string): HttpStatus {
    if (!this.ERROR_CODE_MAPS.has(code)) {
      return HttpStatus.INTERNAL_SERVER_ERROR
    } else {
      return this.ERROR_CODE_MAPS.get(code)
    }
  }
  public getHttpStatus(code: string): HttpStatus {
    return this.getStatusFromErrorCode(code)
  }
}
