import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class ExampleDTO {
  @ApiProperty({ description: 'Name for example' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string
}
