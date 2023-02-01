import { ClientModule } from '@clients'
import { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ExampleController } from './controllers/example.controller'
import { UserErrorHttpStatus } from './errors/constants'
import { ErrorModule } from './errors/error.module'

import { LoggerMiddleware } from './middleware/logger.middleware'
import { ExampleService } from './services/example.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientModule,
    ErrorModule.forApi(UserErrorHttpStatus),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
