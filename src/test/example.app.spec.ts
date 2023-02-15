import { UserClient } from '@clients'
import { USER_COMMANDS, USER_QUEUE_NAME } from '@constants'
import { INestApplication } from '@nestjs/common'
import { ClientProxy, Closeable } from '@nestjs/microservices'
import { Test } from '@nestjs/testing'
import { of } from 'rxjs'
import { ExampleService } from '../services/example.service'
import { ExampleController } from '../controllers/example.controller'
import { mock } from '../__mock__/test'

process.env.LOG_LEVEL = 'debug'

describe('Test client example', () => {
  let exampleController: ExampleController

  const simulationClientMock = mock<ClientProxy & Closeable>('send')
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        ExampleService,
        UserClient,
        {
          provide: USER_QUEUE_NAME,
          useFactory: () => {
            return simulationClientMock
          },
        },
      ],
    }).compile()
    await moduleRef.init()

    exampleController = moduleRef.get<ExampleController>(ExampleController)
  })

  describe('All commands in client', () => {
    const result = 'test'

    beforeEach(() => {
      simulationClientMock.send.mockReset()
    })

    it(`should call client proxy send for command timeout`, async () => {
      simulationClientMock.send.mockReturnValueOnce(of(result))
      await expect(exampleController.timeout()).resolves.toBe(result)

      expect(simulationClientMock.send).toBeCalledWith(USER_COMMANDS.LOGIN, '')
    })
  })
})
