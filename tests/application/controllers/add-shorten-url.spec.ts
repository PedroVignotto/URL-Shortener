import { AddShortenURLController } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'

describe('AddShortenURLController', () => {
  let sut: AddShortenURLController

  const addShortenURL: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new AddShortenURLController(addShortenURL)
  })

  it('Should return 400 if originalURL does not provided', async () => {
    const { statusCode, data } = await sut.handle({ originalURL: null as any })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new RequiredFieldError('originalURL'))
  })

  it('Should call addShortenURL with correct value', async () => {
    await sut.handle({ originalURL: 'any_url' })

    expect(addShortenURL).toHaveBeenCalledWith({ originalURL: 'any_url' })
    expect(addShortenURL).toHaveBeenCalledTimes(1)
  })
})
