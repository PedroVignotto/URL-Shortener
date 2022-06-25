import { AddShortenURLController } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'

describe('AddShortenURLController', () => {
  let sut: AddShortenURLController

  beforeEach(() => {
    sut = new AddShortenURLController()
  })

  it('Should return 400 if originalURL does not provided', async () => {
    const { statusCode, data } = await sut.handle({ originalURL: null as any })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new RequiredFieldError('originalURL'))
  })
})
