import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { SocketGateway } from './gateway'

@WebSocketGateway()
export class TestController {
  constructor(private readonly server: SocketGateway) {}

  @SubscribeMessage('test2')
  test2(): void {
    console.log('a2')
  }
}
