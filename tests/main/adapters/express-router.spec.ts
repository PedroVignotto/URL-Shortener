import { generateRandomFieldName, generateRandomValue } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { ExpressRouter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('ExpressRouterAdapter', () => {
  let sut: ExpressRouter
  let key: string
  let value: string
  let req: Request
  let res: Response

  const controller = mock<Controller>()

  beforeEach(() => {
    sut = new ExpressRouter(controller)

    key = generateRandomFieldName()
    value = generateRandomValue()
    req = getMockReq({ body: { [key]: value } })
    res = getMockRes().res
  })

  it('Should call handle with correct request', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ [key]: value })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })
})
