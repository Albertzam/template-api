import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthNatsController } from './health.controller'

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
  ],
  controllers: [HealthNatsController],
})
export class ApiHealthCheck {}
