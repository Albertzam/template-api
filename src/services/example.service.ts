import { UserClient } from '@clients'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ExampleService {
  constructor(private readonly userClient: UserClient) {}

  async timeout(): Promise<string> {
    return await this.userClient.timeoutMicroservice()
  }

  async rpcError(): Promise<string> {
    return await this.userClient.rpcError()
  }
}
