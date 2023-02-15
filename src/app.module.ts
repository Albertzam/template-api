import { ClientModule } from '@clients'
import { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ExampleController } from './controllers/example.controller'
import { UserErrorHttpStatus } from './errors/constants'
import { ErrorModule } from './errors/error.module'
import { EventsModule } from './events/events.module'
import { ApiHealthCheck } from './healtcheck/healtCheck.module'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { ExampleService } from './services/example.service'
import { SocketModule } from './socket/socket.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiHealthCheck,
    ClientModule,
    ErrorModule.forApi(UserErrorHttpStatus),
    SocketModule,
    EventsModule,
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
