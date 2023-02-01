import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ExampleDTO } from 'src/lib/dto'
import { ExampleService } from 'src/services/example.service'

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}
  @Get()
  exampleGet() {
    return 'Hi :)'
  }

  @Get('timeout')
  async timeout(): Promise<string> {
    return await this.exampleService.timeout()
  }

  @Get('validator')
  @UsePipes(ValidationPipe)
  async validator(@Query() data: ExampleDTO): Promise<string> {
    return
  }

  @Get('rpc-error')
  async rpcError(): Promise<string> {
    return await this.exampleService.rpcError()
  }
}
