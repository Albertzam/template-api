import { NestFactory } from '@nestjs/core'
import { json } from 'express'
import { AppModule } from './app.module'
import { HelmetMiddleware } from '@nest-middlewares/helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NatsOptions, Transport } from '@nestjs/microservices'
import { RedisIoAdapter } from './socket/adapter/redis-io.adapter'
import { EXAMPLE_QUEUE_MICROSERVICE } from './lib/constants/queue'

const options = new DocumentBuilder()
  .setTitle('Ecommerce example')
  .setDescription('Ecommerce request api')
  .setVersion('1.0')
  .addTag('ecommerce')
  .addBearerAuth()
  .build()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const helmet = new HelmetMiddleware()
  HelmetMiddleware.configure({})
  app.use(helmet.use)
  app.enableCors()
  app.use(json({ limit: '1000kb' })) // Form files

  // create swagger document
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  /**
   * Convert nest application to hybrid app
   */
  app.connectMicroservice<NatsOptions>({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL],
      debug: false,
      queue: EXAMPLE_QUEUE_MICROSERVICE,
    },
  })

  const redisIoAdapter = new RedisIoAdapter(app)
  await redisIoAdapter.connectToRedis()
  app.useWebSocketAdapter(redisIoAdapter)

  await app.startAllMicroservices()
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
