import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { json } from 'express'
import { AppModule } from './app.module'
import { HelmetMiddleware } from '@nest-middlewares/helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const helmet = new HelmetMiddleware()
  HelmetMiddleware.configure({})
  app.use(helmet.use)
  app.enableCors()
  app.use(json({ limit: '1000kb' })) // Form files

  // app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
