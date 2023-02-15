import { Events } from '@constants'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { SocketGateway } from 'src/socket/gateway'

@Controller()
export class ExampleEventController {
  constructor(private readonly server: SocketGateway) {}

  @EventPattern(Events.EXAMPLE_EVENTS)
  exampleTest(): void {
    this.server.server.emit('eventExample')
  }
}
