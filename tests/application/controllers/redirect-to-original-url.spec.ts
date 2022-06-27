import { Controller, RedirectToOriginalURLController } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'

describe('RedirectToOriginalURLController', () => {
  let sut: RedirectToOriginalURLController

  beforeEach(() => {
    sut = new RedirectToOriginalURLController()
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should return 400 if code does not provided', async () => {
    const { statusCode, data } = await sut.handle({ code: null as any })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new RequiredFieldError('code'))
  })
})
