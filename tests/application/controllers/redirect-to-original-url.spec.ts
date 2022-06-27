import { generateRandomCode } from '@/tests/mocks'
import { Controller, RedirectToOriginalURLController } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'

describe('RedirectToOriginalURLController', () => {
  let sut: RedirectToOriginalURLController
  let code: string

  const redirectToOriginalURL: jest.Mock = jest.fn()

  beforeAll(() => {
    code = generateRandomCode()
  })

  beforeEach(() => {
    sut = new RedirectToOriginalURLController(redirectToOriginalURL)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should return 400 if code does not provided', async () => {
    const { statusCode, data } = await sut.handle({ code: null as any })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new RequiredFieldError('code'))
  })

  it('Should call redirectToOriginalURL with correct value', async () => {
    await sut.handle({ code })

    expect(redirectToOriginalURL).toHaveBeenCalledWith({ code })
    expect(redirectToOriginalURL).toHaveBeenCalledTimes(1)
  })
})
