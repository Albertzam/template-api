import { USER_COMMANDS, USER_QUEUE_NAME } from '@constants'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom, timeout } from 'rxjs'

@Injectable()
export class UserClient {
  constructor(
    @Inject(USER_QUEUE_NAME) private readonly userClient: ClientProxy
  ) {}

  async timeoutMicroservice(): Promise<string> {
    return await lastValueFrom(
      this.userClient.send(USER_COMMANDS.LOGIN, '').pipe(timeout(2000))
    )
  }

  async rpcError(): Promise<string> {
    return await lastValueFrom(
      this.userClient.send(USER_COMMANDS.REFRESH, '').pipe(timeout(2000))
    )
  }
}
