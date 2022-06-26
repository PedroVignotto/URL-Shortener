import { generateRandomURL, generateRandomCode } from '@/tests/mocks'
import { AddShortenURLController } from '@/application/controllers'
import { RequiredFieldError, ServerError } from '@/application/errors'

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

  it('Should return 500 if addShortenURL throws', async () => {
    addShortenURL.mockRejectedValueOnce(new Error())

    const { statusCode, data } = await sut.handle({ originalURL })

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(new Error()))
  })

  it('Should return 500 if addShortenURL throws a non error object', async () => {
    addShortenURL.mockRejectedValueOnce('any_error')

    const { statusCode, data } = await sut.handle({ originalURL })

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError())
  })

  it('Should return 201 with shortened URL on success', async () => {
    const { statusCode, data } = await sut.handle({ originalURL })

    expect(statusCode).toBe(201)
    expect(data).toEqual({ shortURL: `${process.env.APP_URL!}/${code}` })
  })
})
