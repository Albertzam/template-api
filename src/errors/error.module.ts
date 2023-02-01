import { DynamicModule, Module, Provider } from '@nestjs/common'
import { ErrorCodesMap } from './constants'
import { DeserializerExceptionFilter } from './deserializeError'
import { ErrorService } from './error.service'

@Module({ providers: [ErrorService] })
export class ErrorModule {
  static forApi(...errorCodesMaps: Array<ErrorCodesMap>): DynamicModule {
    const provider = errorProvider(...errorCodesMaps)
    return {
      module: ErrorModule,
      providers: [
        provider,
        {
          provide: 'APP_FILTER',
          useClass: DeserializerExceptionFilter,
        },
      ],
      exports: [provider],
    }
  }
}

const errorProvider = (...errorCodesMaps: Array<ErrorCodesMap>): Provider => {
  return {
    provide: ErrorService,
    useFactory: async () => {
      const errorService = new ErrorService()
      for (const errorCodeMap of errorCodesMaps) {
        for (const errorKey of Object.keys(errorCodeMap)) {
          errorService.registerErrorCodeMap(errorKey, errorCodeMap[errorKey])
        }
      }
      return errorService
    },
  }
}
