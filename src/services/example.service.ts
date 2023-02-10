import { Injectable } from '@nestjs/common'
import { UserClient } from '../client/users/user.client'

@Injectable()
export class ExampleService {
  constructor(private readonly userClient: UserClient) {}

  async timeout(): Promise<{ _id: string; name: string }> {
    return await this.userClient.timeoutMicroservice()
  }

  async rpcError(): Promise<string> {
    return await this.userClient.rpcError()
  }
}
