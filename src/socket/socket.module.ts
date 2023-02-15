import { Module } from '@nestjs/common'

import { SocketGateway } from './gateway'
import { TestController } from './test.controller'

@Module({
  imports: [],
  providers: [SocketGateway, TestController],
  exports: [SocketGateway],
})
export class SocketModule {}
