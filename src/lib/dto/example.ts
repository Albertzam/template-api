import { IsNotEmpty, IsString } from 'class-validator'

export class ExampleDTO {
  @IsString()
  @IsNotEmpty()
  name: string
}
