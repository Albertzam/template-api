import { NestFactory } from '@nestjs/core'
import { json } from 'express'
import { AppModule } from './app.module'
import { HelmetMiddleware } from '@nest-middlewares/helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NatsOptions, TcpOptions, Transport } from '@nestjs/microservices'

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

  //connect api to microservices
  app.connectMicroservice<NatsOptions>({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL],
      debug: false,
    },
  })

  app.connectMicroservice<TcpOptions>({
    transport: Transport.TCP,
    options: {
      host: '',
      port: 1234,
    },
  })

  await app.startAllMicroservices()
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
