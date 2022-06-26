import { generateRandomURL, generateRandomCode } from '@/tests/mocks'
import { Controller, AddShortenURLController } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'

describe('AddShortenURLController', () => {
  let sut: AddShortenURLController
  let originalURL: string
  let code: string

  const addShortenURL: jest.Mock = jest.fn()

  beforeAll(() => {
    originalURL = generateRandomURL()
    code = generateRandomCode()

    addShortenURL.mockResolvedValue(code)
  })

  beforeEach(() => {
    sut = new AddShortenURLController(addShortenURL)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should return 400 if originalURL does not provided', async () => {
    const { statusCode, data } = await sut.handle({ originalURL: null as any })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new RequiredFieldError('originalURL'))
  })

  it('Should call addShortenURL with correct value', async () => {
    await sut.handle({ originalURL })

    expect(addShortenURL).toHaveBeenCalledWith({ originalURL })
    expect(addShortenURL).toHaveBeenCalledTimes(1)
  })

  it('Should return 201 with shortened URL on success', async () => {
    const { statusCode, data } = await sut.handle({ originalURL })

    expect(statusCode).toBe(201)
    expect(data).toEqual({ shortURL: `${process.env.APP_URL!}/${code}` })
  })
})
