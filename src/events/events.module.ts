import { Module } from '@nestjs/common'
import { ExampleEventController } from './controllers'
import { SocketModule } from '../socket/socket.module'
@Module({
  imports: [SocketModule],
  controllers: [ExampleEventController],
})
export class EventsModule {}
