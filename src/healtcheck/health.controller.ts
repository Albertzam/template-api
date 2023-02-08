import { Controller, Get } from '@nestjs/common'
import {
  MicroserviceOptions,
  NatsOptions,
  RedisOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices'
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus'

@Controller('health-microservice')
export class HealthNatsController {
  constructor(
    private healthCheckService: HealthCheckService,
    private healthMicroservice: MicroserviceHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async getHealth(): Promise<HealthCheckResult> {
    return await this.healthCheckService.check([
      () =>
        this.healthMicroservice.pingCheck<NatsOptions>('nats', {
          transport: Transport.NATS,
          options: {
            servers: [process.env.NATS_URL],
          },
        }),
      () =>
        this.healthMicroservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            password: '',
            username: '',
            host: 'localhost',
            port: 1231,
          },
        }),
      () =>
        this.healthMicroservice.pingCheck<RmqOptions>('microservice', {
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'example_queue',
          },
        }),
    ])
  }
}
