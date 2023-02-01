import { ValidationError } from 'class-validator'
import { ErrorMetadata } from './constants'

export class MicroserviceError extends Error {
  public code: string
  public metadata?: { [x: string]: string }
  public fields?: Array<ValidationError>
  public error?: Error
  constructor(
    message: string,
    code: string,
    fields: Array<ValidationError>, //Class validator using DTO
    metadata?: ErrorMetadata,
    error?: Error
  ) {
    super(message)
    this.code = code
    this.fields = fields
    this.metadata = metadata
    this.error = error
  }
}
