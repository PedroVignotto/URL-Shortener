import { generateRandomFieldName, generateRandomValue } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { expressRedirectRouterAdapter, expressRouterAdapter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('ExpressRouterAdapter', () => {
  let sut: RequestHandler
  let key: string
  let value: string
  let req: Request
  let res: Response
  let next: NextFunction

  const controller = mock<Controller>()

  beforeEach(() => {
    sut = expressRouterAdapter(controller)

    key = generateRandomFieldName()
    value = generateRandomValue()
    res = getMockRes().res
    next = getMockRes().next

    controller.handle.mockResolvedValue({ statusCode: 200, data: { data: value } })
  })

  describe('expressRouterAdapter', () => {
    beforeEach(() => {
      sut = expressRouterAdapter(controller)

      req = getMockReq({ body: { [key]: value } })
    })

    it('Should call handle with correct request', async () => {
      await sut(req, res, next)

      expect(controller.handle).toHaveBeenCalledWith({ [key]: value })
      expect(controller.handle).toHaveBeenCalledTimes(1)
    })

    it('Should call handle with empty request', async () => {
      req = getMockReq()

      await sut(req, res, next)

      expect(controller.handle).toHaveBeenCalledWith({})
      expect(controller.handle).toHaveBeenCalledTimes(1)
    })

    it('Should respond with correct statusCode and data on success', async () => {
      await sut(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ data: value })
    })

    it('Should respond with correct statusCode and error on failure', async () => {
      controller.handle.mockResolvedValueOnce({ statusCode: 400, data: new Error() })

      await sut(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ error: new Error().message })
    })
  })

  describe('expressRedirectRouterAdapter', () => {
    beforeEach(() => {
      sut = expressRedirectRouterAdapter(controller)

      req = getMockReq({ params: { [key]: value } })
    })

    it('Should call handle with correct request', async () => {
      await sut(req, res, next)

      expect(controller.handle).toHaveBeenCalledWith({ [key]: value })
      expect(controller.handle).toHaveBeenCalledTimes(1)
    })

    it('Should respond with correct data on success', async () => {
      controller.handle.mockResolvedValueOnce({ statusCode: 200, data: value })

      await sut(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(value)
    })

    it('Should respond with correct statusCode and error on failure', async () => {
      controller.handle.mockResolvedValueOnce({ statusCode: 404, data: new Error() })

      await sut(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ error: new Error().message })
    })
  })
})
