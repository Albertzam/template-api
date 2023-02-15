import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id)
  }
  handleConnection(client: Socket) {
    console.log('Client connected:s ', client.id)
  }

  @SubscribeMessage('test')
  test(): void {
    console.log('aaa')
  }
  afterInit(server: Server): void {
    this.server = server
  }
}
