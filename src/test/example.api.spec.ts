import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ExampleController } from '../controllers/example.controller'
import { UserErrorHttpStatus } from '../errors/constants'
import { ErrorModule } from '../errors/error.module'

import { ExampleService } from '../services/example.service'
import * as request from 'supertest'

describe('Example controller', () => {
  let app: INestApplication
  let exampleService = { timeout: jest.fn(), rpcError: jest.fn() }
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ErrorModule.forApi(UserErrorHttpStatus)],
      controllers: [ExampleController],
      providers: [ExampleService],
    })
      .overrideProvider(ExampleService)
      .useValue(exampleService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it(`/GET timeout`, () => {
    return request(app.getHttpServer()).get('/timeout').expect(200).expect({})
  })

  afterAll(async () => {
    await app.close()
  })
})
