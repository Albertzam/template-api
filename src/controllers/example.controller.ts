import {
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'
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

  @Post('validator')
  @UsePipes(ValidationPipe)
  @ApiResponse({ type: ExampleDTO, status: 200 })
  @ApiBody({ type: ExampleDTO })
  async validator(@Query() data: ExampleDTO): Promise<ExampleDTO> {
    return
  }

  @Get('rpc-error')
  async rpcError(): Promise<string> {
    return await this.exampleService.rpcError()
  }
}
