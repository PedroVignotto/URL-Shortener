import { generateRandomCode, generateRandomURL } from '@/tests/mocks'
import { Controller, RedirectToOriginalURLController } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'

describe('RedirectToOriginalURLController', () => {
  let sut: RedirectToOriginalURLController
  let originalURL: string
  let code: string

  const redirectToOriginalURL: jest.Mock = jest.fn()

  beforeAll(() => {
    originalURL = generateRandomURL()
    code = generateRandomCode()

    redirectToOriginalURL.mockResolvedValue(originalURL)
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

  it('Should return 200 with original URL on success', async () => {
    const { statusCode, data } = await sut.handle({ code })

    expect(statusCode).toBe(200)
    expect(data).toEqual({ originalURL })
  })
})
