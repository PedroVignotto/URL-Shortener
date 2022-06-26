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

    controller.handle.mockResolvedValue({ statusCode: 200, data: { data: value } })
  })

  it('Should call handle with correct request', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ [key]: value })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('Should call handle with empty request', async () => {
    req = getMockReq()

    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('Should respond with correct statusCode and data on success', async () => {
    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: value })
  })

  it('Should respond with correct statusCode and error on failure', async () => {
    controller.handle.mockResolvedValueOnce({ statusCode: 400, data: new Error() })

    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: new Error().message })
  })
})
