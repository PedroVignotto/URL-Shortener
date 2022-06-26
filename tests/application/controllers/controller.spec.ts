import { Controller } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { HttpResponse } from '@/application/helpers'

class ControllerStub extends Controller {
  result: HttpResponse = { statusCode: 200, data: null }

  async perform (): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('Should return serverError if perform throw', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(new Error())

    const { statusCode, data } = await sut.handle()

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(new Error()))
  })

  it('Should return serverError if perform throw a non error object', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce('any_error')

    const { statusCode, data } = await sut.handle()

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError())
  })

  it('Should return same result as perform', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual(sut.result)
  })
})
