import { configurationClient, USER_QUEUE_NAME } from '@constants'
import { ClientConfig } from '@interfaces'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { UserClient } from './users/user.client'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule.forFeature(configurationClient)],
        name: USER_QUEUE_NAME,
        useFactory: async (config: ConfigService<ClientConfig>) => {
          return {
            transport: Transport.NATS,
            options: {
              servers: config.get('NATS').servers,
              queue: USER_QUEUE_NAME,
            },
          }
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [UserClient],
  exports: [UserClient],
})
export class ClientModule {}
